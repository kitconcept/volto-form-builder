# -*- coding: utf-8 -*-
from io import StringIO
from voltoformbuilder import _
from plone.rest import Service
from plone.restapi.deserializer import json_body
from zope.component import getUtility
from Products.CMFPlone.interfaces import IMailSchema
from plone.registry.interfaces import IRegistry
from Products.CMFCore.utils import getToolByName
from zope.i18nmessageid import Message
from Products.CMFPlone.utils import safe_unicode
from zope.i18n import translate
from smtplib import SMTPException

import csv
import logging
import transaction

logger = logging.getLogger("voltoformbuilder")

MAIL_NOTIFICATION_MESSAGE_SITE_ADMINISTRATOR = _(
    u'mail_notification_message_site_administrator',
    default=u'A form on "${title}" '
            u'has been submitted here: ${link}\n\n'
            u'---\n\n'
            u'${text}\n\n'
            u'---\n\n',
    )

class FormPost(Service):
    def render(self):
        # get sender from mailhost settings
        mail_host = getToolByName(self.context, 'MailHost')
        registry = getUtility(IRegistry)
        mail_settings = registry.forInterface(IMailSchema, prefix='plone')
        sender = mail_settings.email_from_address

        # Check if a sender address is available
        if not sender:
            return

        subject = translate(_(u'A form has been submitted.'), context=self.context.REQUEST)
        json = json_body(self.context.REQUEST)
        text_form_data = ""
        for key, value in json_body(self.context.REQUEST).items():
            text_form_data += "{}: {}\n".format(key, value)
        message = translate(
            Message(
                MAIL_NOTIFICATION_MESSAGE_SITE_ADMINISTRATOR,
                mapping={
                    'title': safe_unicode(self.context.title),
                    'link': self.context.absolute_url(),
                    'text': text_form_data,
                },
            ),
            context=self.context,
        )

        # Send email
        mto = sender
        try:
            mail_host.send(message, mto, sender, subject, charset='utf-8')
        except SMTPException as e:
            logger.error(
                'SMTP exception (%s) while trying to send an ' +
                'email notification to the comment moderator ' +
                '(from %s to %s, message: %s)',
                e,
                sender,
                mto,
                message,
            )
        transaction.commit()
        return self.request.response.setStatus(201)


class FormGet(Service):
    def render(self):
        logger.info("FORM: GET")
        self.request.response.setHeader("Content-Type", "application/json")
        return [
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


class FormGetCSV(Service):
    def render(self):
        logger.info("FORM: GET (CSV)")
        # todo: fetch from submit block
        jsondata = [
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
        # JSON -> CSV
        output = StringIO()
        writer = csv.writer(output)
        for row in jsondata:
            writer.writerow(row.values())

        self.request.response.setHeader(
            'Content-Type',
            'text/csv; charset=utf-8'
        )
        filename = "form-data.csv"
        self.request.response.setHeader(
            "Content-Disposition",
            "attachment; filename=%s" % filename
        )
        # self.request.response.setHeader(
        #     "Content-Length",
        #     attachment.size
        # )
        return output.getvalue().strip('\r\n')
