chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({
        config: initConfigDefine
    });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.task == "clearAllCache") {
        chrome.tabs.query({}, function (tabs) {
            $.each(tabs, function (key, value) {
                var callback = function () {
                };
                var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
                var oneWeekAgo = (new Date()).getTime() - millisecondsPerWeek;
                chrome.browsingData.remove({
                    "since": oneWeekAgo
                }, {
                    "appcache": true,
                    "cache": true,
                    "cacheStorage": true,
                    "cookies": true,
                    "downloads": true,
                    "fileSystems": true,
                    "formData": true,
                    "history": true,
                    "indexedDB": true,
                    "localStorage": true,
                    "passwords": true,
                    "serviceWorkers": true,
                    "webSQL": true
                }, callback);
            });
        });
    }
})