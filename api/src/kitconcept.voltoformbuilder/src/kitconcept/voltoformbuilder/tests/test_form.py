# -*- coding: utf-8 -*-
from plone.app.testing import TEST_USER_ID
from plone.app.testing import setRoles
from plone.dexterity.fti import DexterityFTI
from plone.registry.interfaces import IRegistry
from plone.app.testing import SITE_OWNER_NAME
from plone.app.testing import SITE_OWNER_PASSWORD
from plone.restapi.behaviors import IBlocks
from Products.CMFPlone.interfaces import IMailSchema
from Products.CMFPlone.tests.utils import MockMailHost
from Products.MailHost.interfaces import IMailHost
from zope.interface import alsoProvides
from zope.component import createObject
from zope.component import getSiteManager
from zope.component import getUtility
from zope.component import queryUtility

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
        
        # set up blocksdocument content type with IBlock behavior
        fti = DexterityFTI("blocksdocument")
        self.portal.portal_types._setObject("blocksdocument", fti)
        fti.klass = "plone.dexterity.content.Container"
        fti.behaviors = ("volto.blocks",)
        self.portal.invokeFactory("blocksdocument", id="doc")
        self.doc = self.portal["doc"]
        alsoProvides(self.doc, IBlocks)

        # Set up a mock mailhost
        self.portal._original_MailHost = self.portal.MailHost
        self.portal.MailHost = mailhost = MockMailHost('MailHost')
        sm = getSiteManager(context=self.portal)
        sm.unregisterUtility(provided=IMailHost)
        sm.registerUtility(mailhost, provided=IMailHost)
        
        # We need to fake a valid mail setup
        registry = getUtility(IRegistry)
        mail_settings = registry.forInterface(IMailSchema, prefix='plone')
        mail_settings.email_from_address = 'portal@plone.test'
        self.mailhost = self.portal.MailHost
        
        transaction.commit()

    def beforeTearDown(self):
        self.portal.MailHost = self.portal._original_MailHost
        sm = getSiteManager(context=self.portal)
        sm.unregisterUtility(provided=IMailHost)
        sm.registerUtility(aq_base(self.portal._original_MailHost),
                           provided=IMailHost)

    def test_form_post_sends_email_to_portal_administrator(self):
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

        self.assertEqual(len(self.mailhost.messages), 1)
        self.assertTrue(self.mailhost.messages[0])
        msg = self.mailhost.messages[0]
        msg = msg.decode("utf-8")
        self.assertTrue('To: portal@plone.test' in msg)
        self.assertTrue('From: portal@plone.test' in msg)
        # We expect the headers to be properly header encoded (7-bit):
        self.assertTrue(
            'Subject: =?utf-8?q?A_form_has_been_submitted=2E?=\n'
            in msg)
        # # The output should be encoded in a reasonable manner
        # # (in this case quoted-printable):
        # self.assertTrue(
        #     'A comment on "K=C3=B6lle Alaaf" has been posted here:'
        #     in msg)
        # self.assertTrue(
        #     'http://nohost/plone/d=\noc1/view#{0}'.format(comment_id)
        #     in msg)
        # self.assertTrue('Comment text' in msg)
        # self.assertFalse('Approve comment' in msg)
        # self.assertFalse('Delete comment' in msg)

    # def test_form_post(self):
    #     data = {
    #         "email": "john@example.com",
    #         "subject": "hello world",
    #         "comment": "lorem ipsum",
    #     }
    #     response = requests.post(
    #         self.doc.absolute_url() + "/@form",
    #         headers={"Accept": "application/json", "Content-Type": "application/json"},
    #         auth=(SITE_OWNER_NAME, SITE_OWNER_PASSWORD),
    #         json=data,
    #     )
    #     transaction.commit()

    #     self.assertEqual(201, response.status_code)
    #     self.assertEqual(data, self.doc.data)

    # def test_form_post_appends_data(self):
    #     self.doc.data = [
    #         {
    #             "email": "john@example.com",
    #             "subject": "hello world",
    #             "comment": "lorem ipsum",
    #         }
    #     ]
    #     transaction.commit()

    #     newdata = {
    #         "email": "jane@example.com",
    #         "subject": "hi from jane",
    #         "comment": "hi there",
    #     }
    #     response = requests.post(
    #         self.doc.absolute_url() + "/@form",
    #         headers={"Accept": "application/json", "Content-Type": "application/json"},
    #         auth=(SITE_OWNER_NAME, SITE_OWNER_PASSWORD),
    #         json=newdata,
    #     )
    #     transaction.commit()

    #     self.assertEqual(201, response.status_code)
    #     # todo: check that data is appended

    # def test_get_form_data(self):
    #     self.doc.data = [
    #         {
    #             "email": "john@example.com",
    #             "subject": "hello world",
    #             "comment": "lorem ipsum",
    #         },
    #         {
    #             "email": "jane@example.com",
    #             "subject": "hi from jane",
    #             "comment": "hi there",
    #         },
    #     ]
    #     transaction.commit()

    # def test_get_form_data_as_csv(self):
    #     self.doc.data = [
    #         {
    #             "email": "john@example.com",
    #             "subject": "hello world",
    #             "comment": "lorem ipsum",
    #         },
    #         {
    #             "email": "jane@example.com",
    #             "subject": "hi from jane",
    #             "comment": "hi there",
    #         },
    #     ]
    #     transaction.commit()

    #     response = requests.get(
    #         self.doc.absolute_url() + "/@form",
    #         headers={"Accept": "text/csv"},
    #         auth=(SITE_OWNER_NAME, SITE_OWNER_PASSWORD)
    #     )
    #     self.assertEqual(200, response.status_code)
    #     self.assertEqual('attachment; filename=form-data.csv', response.headers.get('Content-Disposition'))
    #     self.assertEqual('80', response.headers.get('Content-Length'))
    #     self.assertEqual('text/csv; charset=utf-8', response.headers.get('Content-Type'))
    #     self.assertEqual('john@example.com,hello world,lorem ipsum\r\njane@example.com,hi from jane,hi there', response.text)
