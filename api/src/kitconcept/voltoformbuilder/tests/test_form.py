# -*- coding: utf-8 -*-
from plone.app.testing import TEST_USER_ID
from plone.app.testing import setRoles
from plone.dexterity.fti import DexterityFTI
from plone.app.testing import SITE_OWNER_NAME
from plone.app.testing import SITE_OWNER_PASSWORD
from plone.restapi.behaviors import IBlocks
from zope.interface import alsoProvides

from kitconcept.voltoformbuilder.testing import (
    KITCONCEPT_VOLTOFORMBUILDER_FUNCTIONAL_TESTING,
)  # noqa

import unittest
import requests
import transaction


class FormSubmitFunctionalTest(unittest.TestCase):

    layer = KITCONCEPT_VOLTOFORMBUILDER_FUNCTIONAL_TESTING

    def setUp(self):
        self.app = self.layer["app"]
        self.request = self.layer["request"]
        self.portal = self.layer["portal"]
        self.portal_url = self.portal.absolute_url()
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        fti = DexterityFTI("blocksdocument")
        self.portal.portal_types._setObject("blocksdocument", fti)
        fti.klass = "plone.dexterity.content.Container"
        fti.behaviors = ("volto.blocks",)
        self.portal.invokeFactory("blocksdocument", id="doc")
        self.doc = self.portal["doc"]
        alsoProvides(self.doc, IBlocks)
        transaction.commit()

    def test_form_post(self):
        data = {
            "email": "john@example.com",
            "subject": "hello world",
            "comment": "lorem ipsum",
        }
        response = requests.post(
            self.doc.absolute_url() + "/@form",
            headers={"Accept": "application/json", "Content-Type": "application/json"},
            auth=(SITE_OWNER_NAME, SITE_OWNER_PASSWORD),
            json=data,
        )
        transaction.commit()

        self.assertEqual(201, response.status_code)
        self.assertEqual(data, self.doc.data)

    def test_form_post_appends_data(self):
        self.doc.data = [
            {
                "email": "john@example.com",
                "subject": "hello world",
                "comment": "lorem ipsum",
            }
        ]
        transaction.commit()

        newdata = {
            "email": "jane@example.com",
            "subject": "hi from jane",
            "comment": "hi there",
        }
        response = requests.post(
            self.doc.absolute_url() + "/@form",
            headers={"Accept": "application/json", "Content-Type": "application/json"},
            auth=(SITE_OWNER_NAME, SITE_OWNER_PASSWORD),
            json=newdata,
        )
        transaction.commit()

        self.assertEqual(201, response.status_code)
        # todo: check that data is appended

    def test_get_form_data(self):
        self.doc.data = [
            {
                "email": "john@example.com",
                "subject": "hello world",
                "comment": "lorem ipsum",
            },
            {
                "email": "jane@example.com",
                "subject": "hi from jane",
                "comment": "hi there",
            },
        ]
        transaction.commit()

    def test_get_form_data_as_csv(self):
        self.doc.data = [
            {
                "email": "john@example.com",
                "subject": "hello world",
                "comment": "lorem ipsum",
            },
            {
                "email": "jane@example.com",
                "subject": "hi from jane",
                "comment": "hi there",
            },
        ]
        transaction.commit()

        response = requests.get(
            self.doc.absolute_url() + "/@form",
            headers={"Accept": "text/csv"},
            auth=(SITE_OWNER_NAME, SITE_OWNER_PASSWORD)
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual('attachment; filename=form-data.csv', response.headers.get('Content-Disposition'))
        self.assertEqual('80', response.headers.get('Content-Length'))
        self.assertEqual('text/csv; charset=utf-8', response.headers.get('Content-Type'))
        self.assertEqual('john@example.com,hello world,lorem ipsum\r\njane@example.com,hi from jane,hi there', response.text)
