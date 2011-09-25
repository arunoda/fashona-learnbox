##Introduction

Webhook is standard of communicating within different web services. Its super simple and You can get more details from here - http://wiki.webhooks.org/w/page/13385124/FrontPage

The problem is assembla.com does not have web hook capability yet. But we need that.
What we actually need?

*    Some one in the team push some code base to assembla
*    In that event assembla should curl and url (which is to our jenkins)
*    Then jenkins can start the build and deploy

##How we fix this

*    Assembla provides an RSS feed. Eg: - https://www.assembla.com/spaces/rngncut/stream.rss
*    We need to authenticate RSS feed via basicAuth (ask me for passwords)
*    We need an application to poll this rss
*    Once a new post arise we need to trigger the url configured

##How you do

*    Create a NodeJS library (./lib/assemblaRss.js) to poll assembla rss and trigger when new content occured
*    Define an JSON based configuration file (./conf/config.json) to load RSS to poll and trigger urls when new posts(commits) arise
*    We should be able to trigger more than one URL for an post (commit)
*    Glue those two (config file and the library) (./start.js)

##Quality

Need Testing and 100% code coverage for this codebase

*    Install Nodeunit from here - https://github.com/arunoda/nodeunit - (DO NOT NPM INSTALL)
*    Use Nodemock - https://github.com/arunoda/nodemock (if required)
*    Use horaa - https://github.com/arunoda/horaa (if required)
