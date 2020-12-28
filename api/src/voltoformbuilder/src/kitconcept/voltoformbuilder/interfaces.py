# -*- coding: utf-8 -*-
"""Module where all interfaces, events and exceptions live."""

from voltoformbuilder import _
from plone.app.textfield import RichText
from plone.schema import Email
from zope import schema
from zope.interface import Interface
from zope.publisher.interfaces.browser import IDefaultBrowserLayer

import zope.schema


class IPlonevoltoformbuilderLayer(IDefaultBrowserLayer):
    """Marker interface that defines a browser layer."""


class IForm(Interface):

    title = schema.TextLine(title=_(u"Title"), required=True)

    description = schema.Text(title=_(u"Description"), required=False)

    data = schema.Text(
        title=_(u"Data"),
        description=_(u"JSON data from form submissions"),
        required=False,
        default=u"{}",
    )

    schema = schema.Text(
        title=_(u"Schema"),
        description=_(u"JSON schema definition of the form"),
        required=False,
        default=u"{}",
    )


class IMailerAction(Interface):

    recipient_name = zope.schema.TextLine(
        title=_(
            u"label_formmailer_recipient_fullname", default=u"Recipient's full name"
        ),
        description=_(
            u"help_formmailer_recipient_fullname",
            default=u"The full name of the recipient of the mailed form.",
        ),
        default=u"",
        missing_value=u"",
        required=False,
    )

    recipient_email = Email(
        title=_(
            u"label_formmailer_recipient_email", default=u"Recipient's e-mail address"
        ),
        description=_(
            u"help_formmailer_recipient_email",
            default=u"The recipients e-mail address.",
        ),
        required=False,
    )

    to_field = zope.schema.Choice(
        title=_(u"label_formmailer_to_extract", default=u"Extract Recipient From"),
        description=_(
            u"help_formmailer_to_extract",
            default=u"Choose a form field from which you wish to extract "
            u"input for the To header. If you choose anything other "
            u'than "None", this will override the "Recipient\'s " '
            u"e-mail address setting above. Be very cautious about "
            u"allowing unguarded user input for this purpose.",
        ),
        required=False,
        vocabulary="easyform.Fields",
    )

    cc_recipients = zope.schema.Text(
        title=_(u"label_formmailer_cc_recipients", default=u"CC Recipients"),
        description=_(
            u"help_formmailer_cc_recipients",
            default=u"E-mail addresses which receive a carbon copy.",
        ),
        default=u"",
        missing_value=u"",
        required=False,
    )

    bcc_recipients = zope.schema.Text(
        title=_(u"label_formmailer_bcc_recipients", default=u"BCC Recipients"),
        description=_(
            u"help_formmailer_bcc_recipients",
            default=u"E-mail addresses which receive a blind carbon copy.",
        ),
        default=u"",
        missing_value=u"",
        required=False,
    )

    replyto_field = zope.schema.Choice(
        title=_(u"label_formmailer_replyto_extract", default=u"Extract Reply-To From"),
        description=_(
            u"help_formmailer_replyto_extract",
            default=u"Choose a form field from which you wish to extract "
            u"input for the Reply-To header. NOTE: You should "
            u"activate e-mail address verification for the "
            u"designated field.",
        ),
        required=False,
        vocabulary="easyform.Fields",
    )

    msg_subject = zope.schema.TextLine(
        title=_(u"label_formmailer_subject", default=u"Subject"),
        description=_(
            u"help_formmailer_subject",
            default=u""
            u"Subject line of message. This is used if you "
            u"do not specify a subject field or if the field "
            u"is empty.",
        ),
        default=u"Form Submission",
        missing_value=u"",
        required=False,
    )

    subject_field = zope.schema.Choice(
        title=_(u"label_formmailer_subject_extract", default=u"Extract Subject From"),
        description=_(
            u"help_formmailer_subject_extract",
            default=u""
            u"Choose a form field from which you wish to extract "
            u"input for the mail subject line.",
        ),
        required=False,
        vocabulary="easyform.Fields",
    )

    body_pre = RichText(
        title=_(u"label_formmailer_body_pre", default=u"Body (prepended)"),
        description=_(
            u"help_formmailer_body_pre",
            default=u"Text prepended to fields listed in mail-body",
        ),
        default=u"",
        missing_value=u"",
        default_mime_type="text/x-web-intelligent",
        allowed_mime_types=("text/x-web-intelligent",),
        output_mime_type="text/x-html-safe",
        required=False,
    )

    body_post = RichText(
        title=_(u"label_formmailer_body_post", default=u"Body (appended)"),
        description=_(
            u"help_formmailer_body_post",
            default=u"Text appended to fields listed in mail-body",
        ),
        default=u"",
        missing_value=u"",
        default_mime_type="text/x-web-intelligent",
        allowed_mime_types=("text/x-web-intelligent",),
        output_mime_type="text/x-html-safe",
        required=False,
    )

    body_footer = RichText(
        title=_(u"label_formmailer_body_footer", default=u"Body (signature)"),
        description=_(
            u"help_formmailer_body_footer",
            default=u"Text used as the footer at "
            u"bottom, delimited from the body by a dashed line.",
        ),
        default=u"",
        missing_value=u"",
        default_mime_type="text/x-web-intelligent",
        allowed_mime_types=("text/x-web-intelligent",),
        output_mime_type="text/x-html-safe",
        required=False,
    )

    show_all = zope.schema.Bool(
        title=_(u"label_mailallfields_text", default=u"Include All Fields"),
        description=_(
            u"help_mailallfields_text",
            default=u""
            u"Check this to include input for all fields "
            u"(except label and file fields). If you check "
            u"this, the choices in the pick box below "
            u"will be ignored.",
        ),
        default=True,
        required=False,
    )

    show_fields = zope.schema.List(
        title=_(u"label_mailfields_text", default=u"Show Responses"),
        description=_(
            u"help_mailfields_text",
            default=u"Pick the fields whose inputs you'd like to include in "
            u"the e-mail.",
        ),
        unique=True,
        required=False,
        value_type=zope.schema.Choice(vocabulary="easyform.Fields"),
    )

    include_empties = zope.schema.Bool(
        title=_(u"label_mailEmpties_text", default=u"Include Empties"),
        description=_(
            u"help_mailEmpties_text",
            default=u""
            u"Check this to include titles "
            u"for fields that received no input. Uncheck "
            u"to leave fields with no input out of the e-mail.",
        ),
        default=True,
        required=False,
    )

    send_csv = zope.schema.Bool(
        title=_(u"label_sendCSV_text", default=u"Send CSV data attachment"),
        description=_(
            u"help_sendCSV_text",
            default=u""
            u"Check this to send a CSV file "
            u"attachment containing the values "
            u"filled out in the form.",
        ),
        default=False,
        required=False,
    )

    body_pt = zope.schema.Text(
        title=_(u"label_formmailer_body_pt", default=u"Mail-Body Template"),
        description=_(
            u"help_formmailer_body_pt",
            default=u"This is a Zope Page Template used for rendering of "
            u"the mail-body. You don't need to modify it, but if you "
            u"know TAL (Zope's Template Attribute Language) have "
            u"the full power to customize your outgoing mails.",
        ),
        # defaultFactory=default_mail_body,
        missing_value=u"",
    )

    body_type = zope.schema.Choice(
        title=_(u"label_formmailer_body_type", default=u"Mail Format"),
        description=_(
            u"help_formmailer_body_type",
            default=u"Set the mime-type of the mail-body. Change this "
            u"setting only if you know exactly what you are doing. "
            u"Leave it blank for default behaviour.",
        ),
        default=u"html",
        vocabulary="easyform.MimeList",
    )

    xinfo_headers = zope.schema.List(
        title=_(u"label_xinfo_headers_text", default=u"HTTP Headers"),
        description=_(
            u"help_xinfo_headers_text",
            default=u""
            u"Pick any items from the HTTP headers that "
            u"you'd like to insert as X- headers in the message.",
        ),
        unique=True,
        required=False,
        default=[u"HTTP_X_FORWARDED_FOR", u"REMOTE_ADDR", u"PATH_INFO"],
        missing_value=[u"HTTP_X_FORWARDED_FOR", u"REMOTE_ADDR", u"PATH_INFO"],
        value_type=zope.schema.Choice(vocabulary="easyform.XinfoHeaders"),
    )

    additional_headers = zope.schema.List(
        title=_(u"label_formmailer_additional_headers", default=u"Additional Headers"),
        description=_(
            u"help_formmailer_additional_headers",
            default=u"Additional e-mail-header lines. Only use "
            u"RFC822-compliant headers.",
        ),
        unique=True,
        required=False,
        value_type=zope.schema.TextLine(
            title=_(
                u"extra_header", default=u"${name} Header", mapping={u"name": u"HTTP"}
            )
        ),
    )

    subjectOverride = zope.schema.TextLine(
        title=_(u"label_subject_override_text", default=u"Subject Expression"),
        description=_(
            u"help_subject_override_text",
            default=u"A TALES expression that will be evaluated to override "
            u"any value otherwise entered for the e-mail subject "
            u"header. Leave empty if unneeded. Your expression "
            u"should evaluate as a string. PLEASE NOTE: errors in "
            u"the evaluation of this expression will cause an error "
            u"on form display.",
        ),
        required=False,
        default=u"",
        missing_value=u"",
        # constraint=isTALES,
    )

    senderOverride = zope.schema.TextLine(
        title=_(u"label_sender_override_text", default=u"Sender Expression"),
        description=_(
            u"help_sender_override_text",
            default=u"A TALES expression that will be evaluated to override "
            u'the "From" header. Leave empty if unneeded. '
            u"Your expression should evaluate as a string. "
            u"PLEASE NOTE: errors in the evaluation of this "
            u"expression will cause an error on form display.",
        ),
        required=False,
        default=u"",
        missing_value=u"",
        # constraint=isTALES,
    )

    recipientOverride = zope.schema.TextLine(
        title=_(u"label_recipient_override_text", default=u"Recipient Expression"),
        description=_(
            u"help_recipient_override_text",
            default=u"A TALES expression that will be evaluated to override "
            u"any value otherwise entered for the recipient "
            u"e-mail address. You are strongly cautioned against using"
            u"unvalidated data from the request for this purpose. "
            u"Leave empty if unneeded. Your expression should "
            u"evaluate as a string. PLEASE NOTE: errors in the "
            u"evaluation of this expression will cause "
            u"an error on form display.",
        ),
        required=False,
        default=u"",
        missing_value=u"",
        # constraint=isTALES,
    )

    cc_override = zope.schema.TextLine(
        title=_(u"label_cc_override_text", default=u"CC Expression"),
        description=_(
            u"help_cc_override_text",
            default=u"A TALES expression that will be evaluated to override "
            u"any value otherwise entered for the CC list. You are "
            u"strongly cautioned against using unvalidated data from "
            u"the request for this purpose. Leave empty if unneeded. "
            u"Your expression should evaluate as a sequence of "
            u"strings. PLEASE NOTE: errors in the evaluation of this "
            u"expression will cause an error on form display.",
        ),
        required=False,
        default=u"",
        missing_value=u"",
        # constraint=isTALES,
    )

    bcc_override = zope.schema.TextLine(
        title=_(u"label_bcc_override_text", default=u"BCC Expression"),
        description=_(
            u"help_bcc_override_text",
            default=u"A TALES expression that will be evaluated to override "
            u"any value otherwise entered for the BCC list. "
            u"You are strongly cautioned against using "
            u"unvalidated data from the request for this purpose. "
            u"Leave empty if unneeded. Your expression should "
            u"evaluate as a sequence of strings. PLEASE NOTE: errors "
            u"in the evaluation of this expression will cause "
            u"an error on form display.",
        ),
        required=False,
        default=u"",
        missing_value=u"",
        # constraint=isTALES,
    )
