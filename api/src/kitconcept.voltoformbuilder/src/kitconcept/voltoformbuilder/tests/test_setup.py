# -*- coding: utf-8 -*-
"""Setup tests for this package."""
from kitconcept.voltoformbuilder.testing import (
    KITCONCEPT_VOLTOFORMBUILDER_INTEGRATION_TESTING,
)  # noqa
from plone import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from Products.CMFPlone.utils import get_installer

import unittest


class TestSetup(unittest.TestCase):
    """Test that kitconcept.voltoformbuilder is properly installed."""

    layer = KITCONCEPT_VOLTOFORMBUILDER_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        self.installer = get_installer(self.portal)

    def test_product_installed(self):
        """Test if kitconcept.voltoformbuilder is installed."""
        self.assertTrue(
            self.installer.is_product_installed("kitconcept.voltoformbuilder")
        )

    def test_browserlayer(self):
        """Test that IPlonevoltoformbuilderLayer is registered."""
        from kitconcept.voltoformbuilder.interfaces import IPlonevoltoformbuilderLayer
        from plone.browserlayer import utils

        self.assertIn(IPlonevoltoformbuilderLayer, utils.registered_layers())


class TestUninstall(unittest.TestCase):

    layer = KITCONCEPT_VOLTOFORMBUILDER_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer["portal"]
        self.installer = get_installer(self.portal, self.layer["request"])
        roles_before = api.user.get_roles(TEST_USER_ID)
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        self.installer.uninstallProducts(["kitconcept.voltoformbuilder"])
        setRoles(self.portal, TEST_USER_ID, roles_before)

    def test_product_uninstalled(self):
        """Test if kitconcept.voltoformbuilder is cleanly uninstalled."""
        self.assertFalse(
            self.installer.isProductInstalled("kitconcept.voltoformbuilder")
        )

    def test_browserlayer_removed(self):
        """Test that IPlonevoltoformbuilderLayer is removed."""
        from kitconcept.voltoformbuilder.interfaces import IPlonevoltoformbuilderLayer
        from plone.browserlayer import utils

        self.assertNotIn(IPlonevoltoformbuilderLayer, utils.registered_layers())
