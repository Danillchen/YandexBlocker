// ==UserScript==
// @name         Yandex Ads Blocker
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Блокирует рекламу в Яндекс.Видео и на странице поиска (раздельные правила)
// @author       DaHexv
// @match        *://yandex.ru/video/*
// @match        *://yandex.com/video/*
// @match        *://yandex.ru/search/*
// @match        *://yandex.com/search/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeVideoAds() {
        const videoAdSelectors = [
            'div[id^="yandex_ad"]', // Общие рекламные блоки
            '[class*="yandex-"]', // Элементы с "yandex-" в названии классов
            '[id*="adfox"]', // Adfox-реклама
            '[id*="yabs"]', // YABS-реклама
            '[src*="yandex.ru/ad"]', // Прямые ссылки на рекламу
            '[data-testid="ad"]', // Новые рекламные контейнеры
            '.DirectController_placement_under-player', // Блок под видео
            '.DirectController_placement_organic', // Органическая реклама
            '.DirectController_placement_before-player' // Реклама перед видео
        ];

        videoAdSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            });
        });
    }

    function removeSearchAds() {
        const searchAdSelectors = [
            '.mini-suggest__item-label', // Реклама в поисковых подсказках
            '.mini-suggest__item_type_nav', // Рекламные блоки в поисковых подсказках
            '.Organic-Warning', // Выноски с предупреждениями
            '.RequestMeta-Level_type_antispam', // Уведомления о скрытых ссылках
            '.serp-item.serp-item_card:has(.AdvLabel)' // Полностью удаляем рекламные объявления
        ];

        searchAdSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            });
        });
    }

    if (window.location.href.includes("yandex.ru/video") || window.location.href.includes("yandex.com/video")) {
        setInterval(removeVideoAds, 100);
    }

    if (window.location.href.includes("yandex.ru/search") || window.location.href.includes("yandex.com/search")) {
        setInterval(removeSearchAds, 100);
    }
})();
