
var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

server.extend(module.superModule);

/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * Home-Show : This endpoint is called when a shopper navigates to the home page
 * @name Base/Home-Show
 * @function
 * @memberof Home
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    var Site = require('dw/system/Site');
    var PageMgr = require('dw/experience/PageMgr');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

    pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);

    var page = PageMgr.getPage('homepage');

    if (page && page.isVisible()) {
        res.page('homepage');
    } else {
        res.render('home/homePage');
    }
    next();
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();
