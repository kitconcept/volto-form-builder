# -*- coding: utf-8 -*-
from io import StringIO
from plone.rest import Service
from plone.restapi.deserializer import json_body

import csv
import logging
import transaction

logger = logging.getLogger("kitconcept.voltoformbuilder")


class FormPost(Service):
    def render(self):
        # todo: data needs to be appended
        self.context.data = json_body(self.request)
        transaction.commit()
        logger.info("FORM: POST DATA")
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
