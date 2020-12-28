.. This README is meant for consumption by humans and pypi. Pypi can render rst files so please do not use Sphinx features.
   If you want to learn more about writing documentation, please check out: http://docs.plone.org/about/documentation_styleguide.html
   This text does not appear on pypi or github. It is a comment.

==============================================================================
voltoformbuilder
==============================================================================

.. image:: https://travis-ci.org/kitconcept/voltoformbuilder.svg?branch=master
    :target: https://travis-ci.org/kitconcept/voltoformbuilder

.. image:: https://img.shields.io/pypi/status/voltoformbuilder.svg
    :target: https://pypi.python.org/pypi/voltoformbuilder/
    :alt: Egg Status

.. image:: https://img.shields.io/pypi/v/voltoformbuilder.svg
    :target: https://pypi.python.org/pypi/voltoformbuilder
    :alt: Latest Version

.. image:: https://img.shields.io/pypi/l/voltoformbuilder.svg
    :target: https://pypi.python.org/pypi/voltoformbuilder
    :alt: License

|

.. image:: https://raw.githubusercontent.com/kitconcept/voltoformbuilder/master/kitconcept.png
   :alt: kitconcept
   :target: https://kitconcept.com/

voltoformbuilder allows to submit form data on a content object that implements the IBlocks behavior.

Features
--------

- Submit a form
- Send an email as form action
- Store data of the form submissions as JSON/CSV

Examples
--------

This add-on can be seen in action at the following sites:
- Is there a page on the internet where everybody can see the features?


Documentation
-------------

Submit form data::

    POST
    /Plone/my-document/@form
    Accept: Application/json
    Content-Type: application/json

    {
        "email": "jane@example.com",
        "subject": "hi from jane",
        "comment": "hi there",
    }

Get all submitted form data::

    GET
    /Plone/my-document/@form
    Accept: Application/json

Response::

    [
        {
            "email": "john@example.com",
            "subject": "hello world",
            "comment": "lorem ipsum",
        },
        {
            "email": "jane@example.com",
            "subject": "hi from jane",
            "comment": "hi there",
        }
    ]

Translations
------------

This product has been translated into

- Klingon (thanks, K'Plai)


Installation
------------

Install voltoformbuilder by adding it to your buildout::

    [buildout]

    ...

    eggs =
        voltoformbuilder


and then running ``bin/buildout``


Contribute
----------

- Issue Tracker: https://github.com/collective/voltoformbuilder/issues
- Source Code: https://github.com/collective/voltoformbuilder
- Documentation: https://docs.plone.org/foo/bar


Support
-------

If you are having issues, please let us know.
Send us an email at info@kitconcept.com.


License
-------

The project is licensed under the GPLv2.
