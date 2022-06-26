"use strict";
exports.id = 352;
exports.ids = [352];
exports.modules = {

/***/ 2730:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_Header)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "@heroicons/react/outline"
var outline_ = __webpack_require__(8768);
;// CONCATENATED MODULE: ./src/components/AnimeFlixIcon.tsx

const AnimeFlixIcon = ({ className  })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
        width: "512",
        height: "512",
        viewBox: "0 0 512 512",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: className,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("path", {
                d: "M257.498 293.782L277.084 389.793H419.004L391.023 293.782H257.498Z",
                fill: "#E50914"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("path", {
                d: "M97.7692 289.197L76.673 389.793H272.903L253.317 293.782L97.7692 289.197Z",
                fill: "#E50914"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("path", {
                d: "M189.869 0H313.317L123.448 499.725H0L189.869 0Z",
                fill: "#B1060F"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("path", {
                d: "M317.467 0H189.869L384.402 512H512L317.467 0Z",
                fill: "#E50914"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("path", {
                d: "M248.226 293.526L267.987 389.56H295.529L291.137 293.526H248.226Z",
                fill: "#E50914"
            })
        ]
    })
;
/* harmony default export */ const components_AnimeFlixIcon = (AnimeFlixIcon);

;// CONCATENATED MODULE: ./src/components/Header.tsx





const Header = ()=>{
    const router = (0,router_.useRouter)();
    const handleKeyPress = (event)=>{
        if (event.key === "Enter") router.push(`/search?keyword=${event.currentTarget.value}`);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
        className: "sticky top-0 z-[51] flex h-12 w-full items-center bg-gray-900 shadow-md",
        style: {
            background: "transparent"
        },
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/",
                passHref: true,
                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    children: /*#__PURE__*/ jsx_runtime_.jsx(components_AnimeFlixIcon, {
                        className: "ml-4 h-7 w-7 cursor-pointer sm:ml-6"
                    })
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "ml-4 flex items-center rounded bg-gray-50 py-[1px] px-2 sm:ml-6",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(outline_.SearchIcon, {
                        className: "h-4 w-4"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                        className: "w-44 bg-transparent p-1 text-sm text-black placeholder-gray-400 outline-none sm:w-56 md:w-64 lg:w-72",
                        placeholder: "Search for Anime to watch",
                        onKeyPress: handleKeyPress
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const components_Header = (Header);


/***/ }),

/***/ 6937:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _badrap_bar_of_progress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5191);
/* harmony import */ var _badrap_bar_of_progress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_badrap_bar_of_progress__WEBPACK_IMPORTED_MODULE_0__);

const progressBar = new (_badrap_bar_of_progress__WEBPACK_IMPORTED_MODULE_0___default())({
    size: 4,
    color: "#C3073F",
    className: "z-50",
    delay: 100
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (progressBar);


/***/ }),

/***/ 114:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Jp": () => (/* binding */ MediaStatus),
/* harmony export */   "mK": () => (/* binding */ getSdk)
/* harmony export */ });
/* unused harmony exports ActivitySort, ActivityType, AiringSort, CharacterRole, CharacterSort, ExternalLinkMediaType, ExternalLinkType, LikeableType, MediaFormat, MediaListSort, MediaListStatus, MediaRankType, MediaRelation, MediaSeason, MediaSort, MediaSource, MediaTrendSort, MediaType, ModActionType, ModRole, NotificationType, RecommendationRating, RecommendationSort, ReviewRating, ReviewSort, RevisionHistoryAction, ScoreFormat, SiteTrendSort, StaffLanguage, StaffSort, StudioSort, SubmissionSort, SubmissionStatus, ThreadCommentSort, ThreadSort, UserSort, UserStaffNameLanguage, UserStatisticsSort, UserTitleLanguage, AnimeBannerFragmentDoc, AnimeInfoFragmentDoc, GetAnimeBannerDocument, GetAnimeInfoDocument, GetAnimeByIdsDocument, GetAnimeTitleDocument, GetPopularBannerDocument, SearchAnimeDocument, SearchGenreDocument, GetListDocument, IndexPageDocument, AnimePageDocument, WatchPageDocument */
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(825);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_0__);

var ActivitySort;
(function(ActivitySort) {
    ActivitySort["Id"] = "ID";
    ActivitySort["IdDesc"] = "ID_DESC";
    ActivitySort["Pinned"] = "PINNED";
})(ActivitySort || (ActivitySort = {}));
var ActivityType;
(function(ActivityType) {
    ActivityType[/** A anime list update activity */ "AnimeList"] = "ANIME_LIST";
    ActivityType[/** A manga list update activity */ "MangaList"] = "MANGA_LIST";
    ActivityType[/** Anime & Manga list update, only used in query arguments */ "MediaList"] = "MEDIA_LIST";
    ActivityType[/** A text message activity sent to another user */ "Message"] = "MESSAGE";
    ActivityType[/** A text activity */ "Text"] = "TEXT";
})(ActivityType || (ActivityType = {}));
var AiringSort;
(function(AiringSort) {
    AiringSort["Episode"] = "EPISODE";
    AiringSort["EpisodeDesc"] = "EPISODE_DESC";
    AiringSort["Id"] = "ID";
    AiringSort["IdDesc"] = "ID_DESC";
    AiringSort["MediaId"] = "MEDIA_ID";
    AiringSort["MediaIdDesc"] = "MEDIA_ID_DESC";
    AiringSort["Time"] = "TIME";
    AiringSort["TimeDesc"] = "TIME_DESC";
})(AiringSort || (AiringSort = {}));
var CharacterRole;
(function(CharacterRole) {
    CharacterRole[/** A background character in the media */ "Background"] = "BACKGROUND";
    CharacterRole[/** A primary character role in the media */ "Main"] = "MAIN";
    CharacterRole[/** A supporting character role in the media */ "Supporting"] = "SUPPORTING";
})(CharacterRole || (CharacterRole = {}));
var CharacterSort;
(function(CharacterSort) {
    CharacterSort["Favourites"] = "FAVOURITES";
    CharacterSort["FavouritesDesc"] = "FAVOURITES_DESC";
    CharacterSort["Id"] = "ID";
    CharacterSort["IdDesc"] = "ID_DESC";
    CharacterSort[/** Order manually decided by moderators */ "Relevance"] = "RELEVANCE";
    CharacterSort["Role"] = "ROLE";
    CharacterSort["RoleDesc"] = "ROLE_DESC";
    CharacterSort["SearchMatch"] = "SEARCH_MATCH";
})(CharacterSort || (CharacterSort = {}));
var ExternalLinkMediaType;
(function(ExternalLinkMediaType) {
    ExternalLinkMediaType["Anime"] = "ANIME";
    ExternalLinkMediaType["Manga"] = "MANGA";
    ExternalLinkMediaType["Staff"] = "STAFF";
})(ExternalLinkMediaType || (ExternalLinkMediaType = {}));
var ExternalLinkType;
(function(ExternalLinkType) {
    ExternalLinkType["Info"] = "INFO";
    ExternalLinkType["Social"] = "SOCIAL";
    ExternalLinkType["Streaming"] = "STREAMING";
})(ExternalLinkType || (ExternalLinkType = {}));
var LikeableType;
(function(LikeableType) {
    LikeableType["Activity"] = "ACTIVITY";
    LikeableType["ActivityReply"] = "ACTIVITY_REPLY";
    LikeableType["Thread"] = "THREAD";
    LikeableType["ThreadComment"] = "THREAD_COMMENT";
})(LikeableType || (LikeableType = {}));
var MediaFormat;
(function(MediaFormat) {
    MediaFormat[/** Professionally published manga with more than one chapter */ "Manga"] = "MANGA";
    MediaFormat[/** Anime movies with a theatrical release */ "Movie"] = "MOVIE";
    MediaFormat[/** Short anime released as a music video */ "Music"] = "MUSIC";
    MediaFormat[/** Written books released as a series of light novels */ "Novel"] = "NOVEL";
    MediaFormat[/** (Original Net Animation) Anime that have been originally released online or are only available through streaming services. */ "Ona"] = "ONA";
    MediaFormat[/** Manga with just one chapter */ "OneShot"] = "ONE_SHOT";
    MediaFormat[/** (Original Video Animation) Anime that have been released directly on DVD/Blu-ray without originally going through a theatrical release or television broadcast */ "Ova"] = "OVA";
    MediaFormat[/** Special episodes that have been included in DVD/Blu-ray releases, picture dramas, pilots, etc */ "Special"] = "SPECIAL";
    MediaFormat[/** Anime broadcast on television */ "Tv"] = "TV";
    MediaFormat[/** Anime which are under 15 minutes in length and broadcast on television */ "TvShort"] = "TV_SHORT";
})(MediaFormat || (MediaFormat = {}));
var MediaListSort;
(function(MediaListSort) {
    MediaListSort["AddedTime"] = "ADDED_TIME";
    MediaListSort["AddedTimeDesc"] = "ADDED_TIME_DESC";
    MediaListSort["FinishedOn"] = "FINISHED_ON";
    MediaListSort["FinishedOnDesc"] = "FINISHED_ON_DESC";
    MediaListSort["MediaId"] = "MEDIA_ID";
    MediaListSort["MediaIdDesc"] = "MEDIA_ID_DESC";
    MediaListSort["MediaPopularity"] = "MEDIA_POPULARITY";
    MediaListSort["MediaPopularityDesc"] = "MEDIA_POPULARITY_DESC";
    MediaListSort["MediaTitleEnglish"] = "MEDIA_TITLE_ENGLISH";
    MediaListSort["MediaTitleEnglishDesc"] = "MEDIA_TITLE_ENGLISH_DESC";
    MediaListSort["MediaTitleNative"] = "MEDIA_TITLE_NATIVE";
    MediaListSort["MediaTitleNativeDesc"] = "MEDIA_TITLE_NATIVE_DESC";
    MediaListSort["MediaTitleRomaji"] = "MEDIA_TITLE_ROMAJI";
    MediaListSort["MediaTitleRomajiDesc"] = "MEDIA_TITLE_ROMAJI_DESC";
    MediaListSort["Priority"] = "PRIORITY";
    MediaListSort["PriorityDesc"] = "PRIORITY_DESC";
    MediaListSort["Progress"] = "PROGRESS";
    MediaListSort["ProgressDesc"] = "PROGRESS_DESC";
    MediaListSort["ProgressVolumes"] = "PROGRESS_VOLUMES";
    MediaListSort["ProgressVolumesDesc"] = "PROGRESS_VOLUMES_DESC";
    MediaListSort["Repeat"] = "REPEAT";
    MediaListSort["RepeatDesc"] = "REPEAT_DESC";
    MediaListSort["Score"] = "SCORE";
    MediaListSort["ScoreDesc"] = "SCORE_DESC";
    MediaListSort["StartedOn"] = "STARTED_ON";
    MediaListSort["StartedOnDesc"] = "STARTED_ON_DESC";
    MediaListSort["Status"] = "STATUS";
    MediaListSort["StatusDesc"] = "STATUS_DESC";
    MediaListSort["UpdatedTime"] = "UPDATED_TIME";
    MediaListSort["UpdatedTimeDesc"] = "UPDATED_TIME_DESC";
})(MediaListSort || (MediaListSort = {}));
var MediaListStatus;
(function(MediaListStatus) {
    MediaListStatus[/** Finished watching/reading */ "Completed"] = "COMPLETED";
    MediaListStatus[/** Currently watching/reading */ "Current"] = "CURRENT";
    MediaListStatus[/** Stopped watching/reading before completing */ "Dropped"] = "DROPPED";
    MediaListStatus[/** Paused watching/reading */ "Paused"] = "PAUSED";
    MediaListStatus[/** Planning to watch/read */ "Planning"] = "PLANNING";
    MediaListStatus[/** Re-watching/reading */ "Repeating"] = "REPEATING";
})(MediaListStatus || (MediaListStatus = {}));
var MediaRankType;
(function(MediaRankType) {
    MediaRankType[/** Ranking is based on the media's popularity */ "Popular"] = "POPULAR";
    MediaRankType[/** Ranking is based on the media's ratings/score */ "Rated"] = "RATED";
})(MediaRankType || (MediaRankType = {}));
var MediaRelation;
(function(MediaRelation) {
    MediaRelation[/** An adaption of this media into a different format */ "Adaptation"] = "ADAPTATION";
    MediaRelation[/** An alternative version of the same media */ "Alternative"] = "ALTERNATIVE";
    MediaRelation[/** Shares at least 1 character */ "Character"] = "CHARACTER";
    MediaRelation[/** Version 2 only. */ "Compilation"] = "COMPILATION";
    MediaRelation[/** Version 2 only. */ "Contains"] = "CONTAINS";
    MediaRelation[/** Other */ "Other"] = "OTHER";
    MediaRelation[/** The media a side story is from */ "Parent"] = "PARENT";
    MediaRelation[/** Released before the relation */ "Prequel"] = "PREQUEL";
    MediaRelation[/** Released after the relation */ "Sequel"] = "SEQUEL";
    MediaRelation[/** A side story of the parent media */ "SideStory"] = "SIDE_STORY";
    MediaRelation[/** Version 2 only. The source material the media was adapted from */ "Source"] = "SOURCE";
    MediaRelation[/** An alternative version of the media with a different primary focus */ "SpinOff"] = "SPIN_OFF";
    MediaRelation[/** A shortened and summarized version */ "Summary"] = "SUMMARY";
})(MediaRelation || (MediaRelation = {}));
var MediaSeason;
(function(MediaSeason) {
    MediaSeason[/** Months September to November */ "Fall"] = "FALL";
    MediaSeason[/** Months March to May */ "Spring"] = "SPRING";
    MediaSeason[/** Months June to August */ "Summer"] = "SUMMER";
    MediaSeason[/** Months December to February */ "Winter"] = "WINTER";
})(MediaSeason || (MediaSeason = {}));
var MediaSort;
(function(MediaSort) {
    MediaSort["Chapters"] = "CHAPTERS";
    MediaSort["ChaptersDesc"] = "CHAPTERS_DESC";
    MediaSort["Duration"] = "DURATION";
    MediaSort["DurationDesc"] = "DURATION_DESC";
    MediaSort["EndDate"] = "END_DATE";
    MediaSort["EndDateDesc"] = "END_DATE_DESC";
    MediaSort["Episodes"] = "EPISODES";
    MediaSort["EpisodesDesc"] = "EPISODES_DESC";
    MediaSort["Favourites"] = "FAVOURITES";
    MediaSort["FavouritesDesc"] = "FAVOURITES_DESC";
    MediaSort["Format"] = "FORMAT";
    MediaSort["FormatDesc"] = "FORMAT_DESC";
    MediaSort["Id"] = "ID";
    MediaSort["IdDesc"] = "ID_DESC";
    MediaSort["Popularity"] = "POPULARITY";
    MediaSort["PopularityDesc"] = "POPULARITY_DESC";
    MediaSort["Score"] = "SCORE";
    MediaSort["ScoreDesc"] = "SCORE_DESC";
    MediaSort["SearchMatch"] = "SEARCH_MATCH";
    MediaSort["StartDate"] = "START_DATE";
    MediaSort["StartDateDesc"] = "START_DATE_DESC";
    MediaSort["Status"] = "STATUS";
    MediaSort["StatusDesc"] = "STATUS_DESC";
    MediaSort["TitleEnglish"] = "TITLE_ENGLISH";
    MediaSort["TitleEnglishDesc"] = "TITLE_ENGLISH_DESC";
    MediaSort["TitleNative"] = "TITLE_NATIVE";
    MediaSort["TitleNativeDesc"] = "TITLE_NATIVE_DESC";
    MediaSort["TitleRomaji"] = "TITLE_ROMAJI";
    MediaSort["TitleRomajiDesc"] = "TITLE_ROMAJI_DESC";
    MediaSort["Trending"] = "TRENDING";
    MediaSort["TrendingDesc"] = "TRENDING_DESC";
    MediaSort["Type"] = "TYPE";
    MediaSort["TypeDesc"] = "TYPE_DESC";
    MediaSort["UpdatedAt"] = "UPDATED_AT";
    MediaSort["UpdatedAtDesc"] = "UPDATED_AT_DESC";
    MediaSort["Volumes"] = "VOLUMES";
    MediaSort["VolumesDesc"] = "VOLUMES_DESC";
})(MediaSort || (MediaSort = {}));
var MediaSource;
(function(MediaSource) {
    MediaSource[/** Version 2+ only. Japanese Anime */ "Anime"] = "ANIME";
    MediaSource[/** Version 3 only. Comics excluding manga */ "Comic"] = "COMIC";
    MediaSource[/** Version 2+ only. Self-published works */ "Doujinshi"] = "DOUJINSHI";
    MediaSource[/** Version 3 only. Games excluding video games */ "Game"] = "GAME";
    MediaSource[/** Written work published in volumes */ "LightNovel"] = "LIGHT_NOVEL";
    MediaSource[/** Version 3 only. Live action media such as movies or TV show */ "LiveAction"] = "LIVE_ACTION";
    MediaSource[/** Asian comic book */ "Manga"] = "MANGA";
    MediaSource[/** Version 3 only. Multimedia project */ "MultimediaProject"] = "MULTIMEDIA_PROJECT";
    MediaSource[/** Version 2+ only. Written works not published in volumes */ "Novel"] = "NOVEL";
    MediaSource[/** An original production not based of another work */ "Original"] = "ORIGINAL";
    MediaSource[/** Other */ "Other"] = "OTHER";
    MediaSource[/** Version 3 only. Picture book */ "PictureBook"] = "PICTURE_BOOK";
    MediaSource[/** Video game */ "VideoGame"] = "VIDEO_GAME";
    MediaSource[/** Video game driven primary by text and narrative */ "VisualNovel"] = "VISUAL_NOVEL";
    MediaSource[/** Version 3 only. Written works published online */ "WebNovel"] = "WEB_NOVEL";
})(MediaSource || (MediaSource = {}));
var MediaStatus;
(function(MediaStatus) {
    MediaStatus[/** Ended before the work could be finished */ "Cancelled"] = "CANCELLED";
    MediaStatus[/** Has completed and is no longer being released */ "Finished"] = "FINISHED";
    MediaStatus[/** Version 2 only. Is currently paused from releasing and will resume at a later date */ "Hiatus"] = "HIATUS";
    MediaStatus[/** To be released at a later date */ "NotYetReleased"] = "NOT_YET_RELEASED";
    MediaStatus[/** Currently releasing */ "Releasing"] = "RELEASING";
})(MediaStatus || (MediaStatus = {}));
var MediaTrendSort;
(function(MediaTrendSort) {
    MediaTrendSort["Date"] = "DATE";
    MediaTrendSort["DateDesc"] = "DATE_DESC";
    MediaTrendSort["Episode"] = "EPISODE";
    MediaTrendSort["EpisodeDesc"] = "EPISODE_DESC";
    MediaTrendSort["Id"] = "ID";
    MediaTrendSort["IdDesc"] = "ID_DESC";
    MediaTrendSort["MediaId"] = "MEDIA_ID";
    MediaTrendSort["MediaIdDesc"] = "MEDIA_ID_DESC";
    MediaTrendSort["Popularity"] = "POPULARITY";
    MediaTrendSort["PopularityDesc"] = "POPULARITY_DESC";
    MediaTrendSort["Score"] = "SCORE";
    MediaTrendSort["ScoreDesc"] = "SCORE_DESC";
    MediaTrendSort["Trending"] = "TRENDING";
    MediaTrendSort["TrendingDesc"] = "TRENDING_DESC";
})(MediaTrendSort || (MediaTrendSort = {}));
var MediaType;
(function(MediaType) {
    MediaType[/** Japanese Anime */ "Anime"] = "ANIME";
    MediaType[/** Asian comic */ "Manga"] = "MANGA";
})(MediaType || (MediaType = {}));
var ModActionType;
(function(ModActionType) {
    ModActionType["Anon"] = "ANON";
    ModActionType["Ban"] = "BAN";
    ModActionType["Delete"] = "DELETE";
    ModActionType["Edit"] = "EDIT";
    ModActionType["Expire"] = "EXPIRE";
    ModActionType["Note"] = "NOTE";
    ModActionType["Report"] = "REPORT";
    ModActionType["Reset"] = "RESET";
})(ModActionType || (ModActionType = {}));
var ModRole;
(function(ModRole) {
    ModRole[/** An AniList administrator */ "Admin"] = "ADMIN";
    ModRole[/** An anime data moderator */ "AnimeData"] = "ANIME_DATA";
    ModRole[/** A community moderator */ "Community"] = "COMMUNITY";
    ModRole[/** An AniList developer */ "Developer"] = "DEVELOPER";
    ModRole[/** A discord community moderator */ "DiscordCommunity"] = "DISCORD_COMMUNITY";
    ModRole[/** A lead anime data moderator */ "LeadAnimeData"] = "LEAD_ANIME_DATA";
    ModRole[/** A lead community moderator */ "LeadCommunity"] = "LEAD_COMMUNITY";
    ModRole[/** A head developer of AniList */ "LeadDeveloper"] = "LEAD_DEVELOPER";
    ModRole[/** A lead manga data moderator */ "LeadMangaData"] = "LEAD_MANGA_DATA";
    ModRole[/** A lead social media moderator */ "LeadSocialMedia"] = "LEAD_SOCIAL_MEDIA";
    ModRole[/** A manga data moderator */ "MangaData"] = "MANGA_DATA";
    ModRole[/** A retired moderator */ "Retired"] = "RETIRED";
    ModRole[/** A social media moderator */ "SocialMedia"] = "SOCIAL_MEDIA";
})(ModRole || (ModRole = {}));
var NotificationType;
(function(NotificationType) {
    NotificationType[/** A user has liked your activity */ "ActivityLike"] = "ACTIVITY_LIKE";
    NotificationType[/** A user has mentioned you in their activity */ "ActivityMention"] = "ACTIVITY_MENTION";
    NotificationType[/** A user has sent you message */ "ActivityMessage"] = "ACTIVITY_MESSAGE";
    NotificationType[/** A user has replied to your activity */ "ActivityReply"] = "ACTIVITY_REPLY";
    NotificationType[/** A user has liked your activity reply */ "ActivityReplyLike"] = "ACTIVITY_REPLY_LIKE";
    NotificationType[/** A user has replied to activity you have also replied to */ "ActivityReplySubscribed"] = "ACTIVITY_REPLY_SUBSCRIBED";
    NotificationType[/** An anime you are currently watching has aired */ "Airing"] = "AIRING";
    NotificationType[/** A user has followed you */ "Following"] = "FOLLOWING";
    NotificationType[/** An anime or manga has had a data change that affects how a user may track it in their lists */ "MediaDataChange"] = "MEDIA_DATA_CHANGE";
    NotificationType[/** An anime or manga on the user's list has been deleted from the site */ "MediaDeletion"] = "MEDIA_DELETION";
    NotificationType[/** Anime or manga entries on the user's list have been merged into a single entry */ "MediaMerge"] = "MEDIA_MERGE";
    NotificationType[/** A new anime or manga has been added to the site where its related media is on the user's list */ "RelatedMediaAddition"] = "RELATED_MEDIA_ADDITION";
    NotificationType[/** A user has liked your forum comment */ "ThreadCommentLike"] = "THREAD_COMMENT_LIKE";
    NotificationType[/** A user has mentioned you in a forum comment */ "ThreadCommentMention"] = "THREAD_COMMENT_MENTION";
    NotificationType[/** A user has replied to your forum comment */ "ThreadCommentReply"] = "THREAD_COMMENT_REPLY";
    NotificationType[/** A user has liked your forum thread */ "ThreadLike"] = "THREAD_LIKE";
    NotificationType[/** A user has commented in one of your subscribed forum threads */ "ThreadSubscribed"] = "THREAD_SUBSCRIBED";
})(NotificationType || (NotificationType = {}));
var RecommendationRating;
(function(RecommendationRating) {
    RecommendationRating["NoRating"] = "NO_RATING";
    RecommendationRating["RateDown"] = "RATE_DOWN";
    RecommendationRating["RateUp"] = "RATE_UP";
})(RecommendationRating || (RecommendationRating = {}));
var RecommendationSort;
(function(RecommendationSort) {
    RecommendationSort["Id"] = "ID";
    RecommendationSort["IdDesc"] = "ID_DESC";
    RecommendationSort["Rating"] = "RATING";
    RecommendationSort["RatingDesc"] = "RATING_DESC";
})(RecommendationSort || (RecommendationSort = {}));
var ReviewRating;
(function(ReviewRating) {
    ReviewRating["DownVote"] = "DOWN_VOTE";
    ReviewRating["NoVote"] = "NO_VOTE";
    ReviewRating["UpVote"] = "UP_VOTE";
})(ReviewRating || (ReviewRating = {}));
var ReviewSort;
(function(ReviewSort) {
    ReviewSort["CreatedAt"] = "CREATED_AT";
    ReviewSort["CreatedAtDesc"] = "CREATED_AT_DESC";
    ReviewSort["Id"] = "ID";
    ReviewSort["IdDesc"] = "ID_DESC";
    ReviewSort["Rating"] = "RATING";
    ReviewSort["RatingDesc"] = "RATING_DESC";
    ReviewSort["Score"] = "SCORE";
    ReviewSort["ScoreDesc"] = "SCORE_DESC";
    ReviewSort["UpdatedAt"] = "UPDATED_AT";
    ReviewSort["UpdatedAtDesc"] = "UPDATED_AT_DESC";
})(ReviewSort || (ReviewSort = {}));
var RevisionHistoryAction;
(function(RevisionHistoryAction) {
    RevisionHistoryAction["Create"] = "CREATE";
    RevisionHistoryAction["Edit"] = "EDIT";
})(RevisionHistoryAction || (RevisionHistoryAction = {}));
var ScoreFormat;
(function(ScoreFormat) {
    ScoreFormat[/** An integer from 0-3. Should be represented in Smileys. 0 => No Score, 1 => :(, 2 => :|, 3 => :) */ "Point_3"] = "POINT_3";
    ScoreFormat[/** An integer from 0-5. Should be represented in Stars */ "Point_5"] = "POINT_5";
    ScoreFormat[/** An integer from 0-10 */ "Point_10"] = "POINT_10";
    ScoreFormat[/** A float from 0-10 with 1 decimal place */ "Point_10Decimal"] = "POINT_10_DECIMAL";
    ScoreFormat[/** An integer from 0-100 */ "Point_100"] = "POINT_100";
})(ScoreFormat || (ScoreFormat = {}));
var SiteTrendSort;
(function(SiteTrendSort) {
    SiteTrendSort["Change"] = "CHANGE";
    SiteTrendSort["ChangeDesc"] = "CHANGE_DESC";
    SiteTrendSort["Count"] = "COUNT";
    SiteTrendSort["CountDesc"] = "COUNT_DESC";
    SiteTrendSort["Date"] = "DATE";
    SiteTrendSort["DateDesc"] = "DATE_DESC";
})(SiteTrendSort || (SiteTrendSort = {}));
var StaffLanguage;
(function(StaffLanguage) {
    StaffLanguage[/** English */ "English"] = "ENGLISH";
    StaffLanguage[/** French */ "French"] = "FRENCH";
    StaffLanguage[/** German */ "German"] = "GERMAN";
    StaffLanguage[/** Hebrew */ "Hebrew"] = "HEBREW";
    StaffLanguage[/** Hungarian */ "Hungarian"] = "HUNGARIAN";
    StaffLanguage[/** Italian */ "Italian"] = "ITALIAN";
    StaffLanguage[/** Japanese */ "Japanese"] = "JAPANESE";
    StaffLanguage[/** Korean */ "Korean"] = "KOREAN";
    StaffLanguage[/** Portuguese */ "Portuguese"] = "PORTUGUESE";
    StaffLanguage[/** Spanish */ "Spanish"] = "SPANISH";
})(StaffLanguage || (StaffLanguage = {}));
var StaffSort;
(function(StaffSort) {
    StaffSort["Favourites"] = "FAVOURITES";
    StaffSort["FavouritesDesc"] = "FAVOURITES_DESC";
    StaffSort["Id"] = "ID";
    StaffSort["IdDesc"] = "ID_DESC";
    StaffSort["Language"] = "LANGUAGE";
    StaffSort["LanguageDesc"] = "LANGUAGE_DESC";
    StaffSort[/** Order manually decided by moderators */ "Relevance"] = "RELEVANCE";
    StaffSort["Role"] = "ROLE";
    StaffSort["RoleDesc"] = "ROLE_DESC";
    StaffSort["SearchMatch"] = "SEARCH_MATCH";
})(StaffSort || (StaffSort = {}));
var StudioSort;
(function(StudioSort) {
    StudioSort["Favourites"] = "FAVOURITES";
    StudioSort["FavouritesDesc"] = "FAVOURITES_DESC";
    StudioSort["Id"] = "ID";
    StudioSort["IdDesc"] = "ID_DESC";
    StudioSort["Name"] = "NAME";
    StudioSort["NameDesc"] = "NAME_DESC";
    StudioSort["SearchMatch"] = "SEARCH_MATCH";
})(StudioSort || (StudioSort = {}));
var SubmissionSort;
(function(SubmissionSort) {
    SubmissionSort["Id"] = "ID";
    SubmissionSort["IdDesc"] = "ID_DESC";
})(SubmissionSort || (SubmissionSort = {}));
var SubmissionStatus;
(function(SubmissionStatus) {
    SubmissionStatus["Accepted"] = "ACCEPTED";
    SubmissionStatus["PartiallyAccepted"] = "PARTIALLY_ACCEPTED";
    SubmissionStatus["Pending"] = "PENDING";
    SubmissionStatus["Rejected"] = "REJECTED";
})(SubmissionStatus || (SubmissionStatus = {}));
var ThreadCommentSort;
(function(ThreadCommentSort) {
    ThreadCommentSort["Id"] = "ID";
    ThreadCommentSort["IdDesc"] = "ID_DESC";
})(ThreadCommentSort || (ThreadCommentSort = {}));
var ThreadSort;
(function(ThreadSort) {
    ThreadSort["CreatedAt"] = "CREATED_AT";
    ThreadSort["CreatedAtDesc"] = "CREATED_AT_DESC";
    ThreadSort["Id"] = "ID";
    ThreadSort["IdDesc"] = "ID_DESC";
    ThreadSort["IsSticky"] = "IS_STICKY";
    ThreadSort["RepliedAt"] = "REPLIED_AT";
    ThreadSort["RepliedAtDesc"] = "REPLIED_AT_DESC";
    ThreadSort["ReplyCount"] = "REPLY_COUNT";
    ThreadSort["ReplyCountDesc"] = "REPLY_COUNT_DESC";
    ThreadSort["SearchMatch"] = "SEARCH_MATCH";
    ThreadSort["Title"] = "TITLE";
    ThreadSort["TitleDesc"] = "TITLE_DESC";
    ThreadSort["UpdatedAt"] = "UPDATED_AT";
    ThreadSort["UpdatedAtDesc"] = "UPDATED_AT_DESC";
    ThreadSort["ViewCount"] = "VIEW_COUNT";
    ThreadSort["ViewCountDesc"] = "VIEW_COUNT_DESC";
})(ThreadSort || (ThreadSort = {}));
var UserSort;
(function(UserSort) {
    UserSort["ChaptersRead"] = "CHAPTERS_READ";
    UserSort["ChaptersReadDesc"] = "CHAPTERS_READ_DESC";
    UserSort["Id"] = "ID";
    UserSort["IdDesc"] = "ID_DESC";
    UserSort["SearchMatch"] = "SEARCH_MATCH";
    UserSort["Username"] = "USERNAME";
    UserSort["UsernameDesc"] = "USERNAME_DESC";
    UserSort["WatchedTime"] = "WATCHED_TIME";
    UserSort["WatchedTimeDesc"] = "WATCHED_TIME_DESC";
})(UserSort || (UserSort = {}));
var UserStaffNameLanguage;
(function(UserStaffNameLanguage) {
    UserStaffNameLanguage[/** The staff or character's name in their native language */ "Native"] = "NATIVE";
    UserStaffNameLanguage[/** The romanization of the staff or character's native name */ "Romaji"] = "ROMAJI";
    UserStaffNameLanguage[/** The romanization of the staff or character's native name, with western name ordering */ "RomajiWestern"] = "ROMAJI_WESTERN";
})(UserStaffNameLanguage || (UserStaffNameLanguage = {}));
var UserStatisticsSort;
(function(UserStatisticsSort) {
    UserStatisticsSort["Count"] = "COUNT";
    UserStatisticsSort["CountDesc"] = "COUNT_DESC";
    UserStatisticsSort["Id"] = "ID";
    UserStatisticsSort["IdDesc"] = "ID_DESC";
    UserStatisticsSort["MeanScore"] = "MEAN_SCORE";
    UserStatisticsSort["MeanScoreDesc"] = "MEAN_SCORE_DESC";
    UserStatisticsSort["Progress"] = "PROGRESS";
    UserStatisticsSort["ProgressDesc"] = "PROGRESS_DESC";
})(UserStatisticsSort || (UserStatisticsSort = {}));
var UserTitleLanguage;
(function(UserTitleLanguage) {
    UserTitleLanguage[/** The official english title */ "English"] = "ENGLISH";
    UserTitleLanguage[/** The official english title, stylised by media creator */ "EnglishStylised"] = "ENGLISH_STYLISED";
    UserTitleLanguage[/** Official title in it's native language */ "Native"] = "NATIVE";
    UserTitleLanguage[/** Official title in it's native language, stylised by media creator */ "NativeStylised"] = "NATIVE_STYLISED";
    UserTitleLanguage[/** The romanization of the native language title */ "Romaji"] = "ROMAJI";
    UserTitleLanguage[/** The romanization of the native language title, stylised by media creator */ "RomajiStylised"] = "ROMAJI_STYLISED";
})(UserTitleLanguage || (UserTitleLanguage = {}));
const AnimeBannerFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  fragment AnimeBanner on Media {
    id
    title {
      english
      romaji
    }
    bannerImage
    description
    format
    duration
    meanScore
    genres
    season
    startDate {
      year
    }
  }
`;
const AnimeInfoFragmentDoc = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  fragment AnimeInfo on Media {
    id
    title {
      english
      romaji
    }
    coverImage {
      color
      medium
      large
    }
    format
    duration
    meanScore
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
  }
`;
const GetAnimeBannerDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  query getAnimeBanner($id: Int) {
    Media(id: $id, type: ANIME) {
      ...AnimeBanner
    }
  }
  ${AnimeBannerFragmentDoc}
`;
const GetAnimeInfoDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  query getAnimeInfo($id: Int) {
    Media(id: $id, type: ANIME) {
      ...AnimeInfo
    }
  }
  ${AnimeInfoFragmentDoc}
`;
const GetAnimeByIdsDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  query getAnimeByIds($perPage: Int, $page: Int, $ids: [Int]) {
    Page(perPage: $perPage, page: $page) {
      media(id_in: $ids) {
        ...AnimeInfo
      }
    }
  }
  ${AnimeInfoFragmentDoc}
`;
const GetAnimeTitleDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  query getAnimeTitle($id: Int) {
    Media(id: $id, type: ANIME) {
      title {
        romaji
        english
      }
    }
  }
`;
const GetPopularBannerDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  query getPopularBanner($seasonYear: Int) {
    Media(type: ANIME, sort: POPULARITY_DESC, seasonYear: $seasonYear) {
      ...AnimeBanner
    }
  }
  ${AnimeBannerFragmentDoc}
`;
const SearchAnimeDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  query searchAnime($page: Int, $perPage: Int, $keyword: String) {
    Page(perPage: $perPage, page: $page) {
      media(type: ANIME, search: $keyword) {
        ...AnimeInfo
      }
    }
  }
  ${AnimeInfoFragmentDoc}
`;
const SearchGenreDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  query searchGenre($page: Int, $perPage: Int, $genre: String) {
    Page(perPage: $perPage, page: $page) {
      media(type: ANIME, genre: $genre, sort: POPULARITY_DESC) {
        ...AnimeInfo
      }
    }
  }
  ${AnimeInfoFragmentDoc}
`;
const GetListDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  query getList($perPage: Int, $page: Int, $sort: [MediaSort]) {
    Page(perPage: $perPage, page: $page) {
      media(sort: $sort, type: ANIME) {
        ...AnimeInfo
      }
    }
  }
  ${AnimeInfoFragmentDoc}
`;
const IndexPageDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  query indexPage($perPage: Int, $page: Int, $seasonYear: Int) {
    banner: Media(type: ANIME, sort: POPULARITY_DESC, seasonYear: $seasonYear) {
      ...AnimeBanner
    }
    trending: Page(perPage: $perPage, page: $page) {
      media(sort: TRENDING_DESC, type: ANIME) {
        ...AnimeInfo
      }
    }
    popular: Page(perPage: $perPage, page: $page) {
      media(sort: POPULARITY_DESC, type: ANIME) {
        ...AnimeInfo
      }
    }
    topRated: Page(perPage: $perPage, page: $page) {
      media(sort: SCORE_DESC, type: ANIME) {
        ...AnimeInfo
      }
    }
  }
  ${AnimeBannerFragmentDoc}
  ${AnimeInfoFragmentDoc}
`;
const AnimePageDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  query animePage($id: Int, $perPage: Int) {
    Media(id: $id, type: ANIME) {
      status
      ...AnimeInfo
      ...AnimeBanner
    }
    recommended: Page(perPage: $perPage) {
      recommendations(mediaId: $id, sort: RATING_DESC) {
        mediaRecommendation {
          ...AnimeInfo
        }
      }
    }
  }
  ${AnimeInfoFragmentDoc}
  ${AnimeBannerFragmentDoc}
`;
const WatchPageDocument = (graphql_tag__WEBPACK_IMPORTED_MODULE_0___default())`
  query watchPage($id: Int, $perPage: Int) {
    anime: Media(id: $id) {
      ...AnimeBanner
      ...AnimeInfo
    }
    recommended: Page(perPage: $perPage) {
      recommendations(mediaId: $id, sort: RATING_DESC) {
        mediaRecommendation {
          ...AnimeBanner
          ...AnimeInfo
        }
      }
    }
  }
  ${AnimeBannerFragmentDoc}
  ${AnimeInfoFragmentDoc}
`;
const defaultWrapper = (action, _operationName, _operationType)=>action()
;
function getSdk(client, withWrapper = defaultWrapper) {
    return {
        getAnimeBanner (variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders)=>client.request(GetAnimeBannerDocument, variables, {
                    ...requestHeaders,
                    ...wrappedRequestHeaders
                })
            , "getAnimeBanner", "query");
        },
        getAnimeInfo (variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders)=>client.request(GetAnimeInfoDocument, variables, {
                    ...requestHeaders,
                    ...wrappedRequestHeaders
                })
            , "getAnimeInfo", "query");
        },
        getAnimeByIds (variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders)=>client.request(GetAnimeByIdsDocument, variables, {
                    ...requestHeaders,
                    ...wrappedRequestHeaders
                })
            , "getAnimeByIds", "query");
        },
        getAnimeTitle (variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders)=>client.request(GetAnimeTitleDocument, variables, {
                    ...requestHeaders,
                    ...wrappedRequestHeaders
                })
            , "getAnimeTitle", "query");
        },
        getPopularBanner (variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders)=>client.request(GetPopularBannerDocument, variables, {
                    ...requestHeaders,
                    ...wrappedRequestHeaders
                })
            , "getPopularBanner", "query");
        },
        searchAnime (variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders)=>client.request(SearchAnimeDocument, variables, {
                    ...requestHeaders,
                    ...wrappedRequestHeaders
                })
            , "searchAnime", "query");
        },
        searchGenre (variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders)=>client.request(SearchGenreDocument, variables, {
                    ...requestHeaders,
                    ...wrappedRequestHeaders
                })
            , "searchGenre", "query");
        },
        getList (variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders)=>client.request(GetListDocument, variables, {
                    ...requestHeaders,
                    ...wrappedRequestHeaders
                })
            , "getList", "query");
        },
        indexPage (variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders)=>client.request(IndexPageDocument, variables, {
                    ...requestHeaders,
                    ...wrappedRequestHeaders
                })
            , "indexPage", "query");
        },
        animePage (variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders)=>client.request(AnimePageDocument, variables, {
                    ...requestHeaders,
                    ...wrappedRequestHeaders
                })
            , "animePage", "query");
        },
        watchPage (variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders)=>client.request(WatchPageDocument, variables, {
                    ...requestHeaders,
                    ...wrappedRequestHeaders
                })
            , "watchPage", "query");
        }
    };
}


/***/ }),

/***/ 9113:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "o1": () => (/* binding */ animePage),
  "tN": () => (/* binding */ getAnimeByIds),
  "GJ": () => (/* binding */ getKitsuEpisodes),
  "ou": () => (/* binding */ indexPage),
  "cd": () => (/* binding */ searchAnime),
  "M4": () => (/* binding */ searchGenre),
  "Av": () => (/* binding */ watchPage)
});

// UNUSED EXPORTS: getAnimeBanner, getAnimeInfo, getAnimeTitle, getAnimesKitsu, getEpisodeKitsu, getList, getPopularBanner

// EXTERNAL MODULE: external "graphql-request"
var external_graphql_request_ = __webpack_require__(5805);
// EXTERNAL MODULE: ./src/generated/aniList.ts
var aniList = __webpack_require__(114);
// EXTERNAL MODULE: external "graphql-tag"
var external_graphql_tag_ = __webpack_require__(825);
var external_graphql_tag_default = /*#__PURE__*/__webpack_require__.n(external_graphql_tag_);
;// CONCATENATED MODULE: ./src/generated/kitsu.ts

var AgeRatingEnum;
(function(AgeRatingEnum) {
    AgeRatingEnum[/** Acceptable for all ages */ "G"] = "G";
    AgeRatingEnum[/** Parental guidance suggested; should be safe for preteens and older */ "Pg"] = "PG";
    AgeRatingEnum[/** Possible lewd or intense themes; should be safe for teens and older */ "R"] = "R";
    AgeRatingEnum[/** Contains adult content or themes; should only be viewed by adults */ "R18"] = "R18";
})(AgeRatingEnum || (AgeRatingEnum = {}));
var AnimeSubtypeEnum;
(function(AnimeSubtypeEnum) {
    AnimeSubtypeEnum["Movie"] = "MOVIE";
    AnimeSubtypeEnum["Music"] = "MUSIC";
    AnimeSubtypeEnum[/** Original Net Animation (Web Anime). */ "Ona"] = "ONA";
    AnimeSubtypeEnum[/** Original Video Animation. Anime directly released to video market. */ "Ova"] = "OVA";
    AnimeSubtypeEnum[/** Spinoffs or Extras of the original. */ "Special"] = "SPECIAL";
    AnimeSubtypeEnum["Tv"] = "TV";
})(AnimeSubtypeEnum || (AnimeSubtypeEnum = {}));
var CharacterRoleEnum;
(function(CharacterRoleEnum) {
    CharacterRoleEnum[/** A background character who generally only appears in a few episodes */ "Background"] = "BACKGROUND";
    CharacterRoleEnum[/** A character from a different franchise making a (usually brief) appearance */ "Cameo"] = "CAMEO";
    CharacterRoleEnum[/** A character who appears throughout a series and is a focal point of the media */ "Main"] = "MAIN";
    CharacterRoleEnum[/** A character who appears in multiple episodes but is not a main character */ "Recurring"] = "RECURRING";
})(CharacterRoleEnum || (CharacterRoleEnum = {}));
var CharacterVoiceSortEnum;
(function(CharacterVoiceSortEnum) {
    CharacterVoiceSortEnum["CreatedAt"] = "CREATED_AT";
    CharacterVoiceSortEnum["UpdatedAt"] = "UPDATED_AT";
})(CharacterVoiceSortEnum || (CharacterVoiceSortEnum = {}));
var CommentLikeSortEnum;
(function(CommentLikeSortEnum) {
    CommentLikeSortEnum["CreatedAt"] = "CREATED_AT";
    CommentLikeSortEnum["Following"] = "FOLLOWING";
})(CommentLikeSortEnum || (CommentLikeSortEnum = {}));
var CommentSortEnum;
(function(CommentSortEnum) {
    CommentSortEnum["CreatedAt"] = "CREATED_AT";
    CommentSortEnum["Following"] = "FOLLOWING";
    CommentSortEnum["LikesCount"] = "LIKES_COUNT";
})(CommentSortEnum || (CommentSortEnum = {}));
var EpisodeSortEnum;
(function(EpisodeSortEnum) {
    EpisodeSortEnum["CreatedAt"] = "CREATED_AT";
    EpisodeSortEnum["Number"] = "NUMBER";
    EpisodeSortEnum["UpdatedAt"] = "UPDATED_AT";
})(EpisodeSortEnum || (EpisodeSortEnum = {}));
var FollowSortEnum;
(function(FollowSortEnum) {
    FollowSortEnum["CreatedAt"] = "CREATED_AT";
    FollowSortEnum["FollowingFollowed"] = "FOLLOWING_FOLLOWED";
    FollowSortEnum["FollowingFollower"] = "FOLLOWING_FOLLOWER";
})(FollowSortEnum || (FollowSortEnum = {}));
var InstallmentSortEnum;
(function(InstallmentSortEnum) {
    InstallmentSortEnum["AlternativeOrder"] = "ALTERNATIVE_ORDER";
    InstallmentSortEnum["ReleaseOrder"] = "RELEASE_ORDER";
})(InstallmentSortEnum || (InstallmentSortEnum = {}));
var InstallmentTagEnum;
(function(InstallmentTagEnum) {
    InstallmentTagEnum[/** Same universe/world/reality/timeline, completely different characters. */ "AlternateSetting"] = "ALTERNATE_SETTING";
    InstallmentTagEnum[/** Same setting, same characters, story is told differently. */ "AlternateVersion"] = "ALTERNATE_VERSION";
    InstallmentTagEnum[/** Characters from different media meet in the same story. */ "Crossover"] = "CROSSOVER";
    InstallmentTagEnum[/** The main story. */ "MainStory"] = "MAIN_STORY";
    InstallmentTagEnum[/** Takes place sometime during the main storyline. */ "SideStory"] = "SIDE_STORY";
    InstallmentTagEnum[/** Uses characters of a different series, but is not an alternate setting or story. */ "Spinoff"] = "SPINOFF";
})(InstallmentTagEnum || (InstallmentTagEnum = {}));
var LibraryEntryStatusEnum;
(function(LibraryEntryStatusEnum) {
    LibraryEntryStatusEnum[/** The user completed this media. */ "Completed"] = "COMPLETED";
    LibraryEntryStatusEnum[/** The user is currently reading or watching this media. */ "Current"] = "CURRENT";
    LibraryEntryStatusEnum[/** The user started but chose not to finish this media. */ "Dropped"] = "DROPPED";
    LibraryEntryStatusEnum[/** The user started but paused reading or watching this media. */ "OnHold"] = "ON_HOLD";
    LibraryEntryStatusEnum[/** The user plans to read or watch this media in future. */ "Planned"] = "PLANNED";
})(LibraryEntryStatusEnum || (LibraryEntryStatusEnum = {}));
var LibraryEventKindEnum;
(function(LibraryEventKindEnum) {
    LibraryEventKindEnum[/** Notes were added/updated. */ "Annotated"] = "ANNOTATED";
    LibraryEventKindEnum[/** Progress or Time Spent was added/updated. */ "Progressed"] = "PROGRESSED";
    LibraryEventKindEnum[/** Rating was added/updated. */ "Rated"] = "RATED";
    LibraryEventKindEnum[/** Reaction was added/updated. */ "Reacted"] = "REACTED";
    LibraryEventKindEnum[/** Status or Reconsuming was added/updated. */ "Updated"] = "UPDATED";
})(LibraryEventKindEnum || (LibraryEventKindEnum = {}));
var LibraryEventSortEnum;
(function(LibraryEventSortEnum) {
    LibraryEventSortEnum["CreatedAt"] = "CREATED_AT";
    LibraryEventSortEnum["UpdatedAt"] = "UPDATED_AT";
})(LibraryEventSortEnum || (LibraryEventSortEnum = {}));
var LockedReasonEnum;
(function(LockedReasonEnum) {
    LockedReasonEnum["Closed"] = "CLOSED";
    LockedReasonEnum["Spam"] = "SPAM";
    LockedReasonEnum["TooHeated"] = "TOO_HEATED";
})(LockedReasonEnum || (LockedReasonEnum = {}));
var MangaSubtypeEnum;
(function(MangaSubtypeEnum) {
    MangaSubtypeEnum[/** Self published work. */ "Doujin"] = "DOUJIN";
    MangaSubtypeEnum["Manga"] = "MANGA";
    MangaSubtypeEnum[/** Chinese comics produced in China and in the Greater China region. */ "Manhua"] = "MANHUA";
    MangaSubtypeEnum[/** A style of South Korean comic books and graphic novels */ "Manhwa"] = "MANHWA";
    MangaSubtypeEnum["Novel"] = "NOVEL";
    MangaSubtypeEnum[/** Original English Language. */ "Oel"] = "OEL";
    MangaSubtypeEnum["Oneshot"] = "ONESHOT";
})(MangaSubtypeEnum || (MangaSubtypeEnum = {}));
var MappingExternalSiteEnum;
(function(MappingExternalSiteEnum) {
    MappingExternalSiteEnum["Anidb"] = "ANIDB";
    MappingExternalSiteEnum["AnilistAnime"] = "ANILIST_ANIME";
    MappingExternalSiteEnum["AnilistManga"] = "ANILIST_MANGA";
    MappingExternalSiteEnum["Animenewsnetwork"] = "ANIMENEWSNETWORK";
    MappingExternalSiteEnum["Aozora"] = "AOZORA";
    MappingExternalSiteEnum["Hulu"] = "HULU";
    MappingExternalSiteEnum["ImdbEpisodes"] = "IMDB_EPISODES";
    MappingExternalSiteEnum["Mangaupdates"] = "MANGAUPDATES";
    MappingExternalSiteEnum["MyanimelistAnime"] = "MYANIMELIST_ANIME";
    MappingExternalSiteEnum["MyanimelistCharacters"] = "MYANIMELIST_CHARACTERS";
    MappingExternalSiteEnum["MyanimelistManga"] = "MYANIMELIST_MANGA";
    MappingExternalSiteEnum["MyanimelistPeople"] = "MYANIMELIST_PEOPLE";
    MappingExternalSiteEnum["MyanimelistProducers"] = "MYANIMELIST_PRODUCERS";
    MappingExternalSiteEnum["Mydramalist"] = "MYDRAMALIST";
    MappingExternalSiteEnum["Thetvdb"] = "THETVDB";
    MappingExternalSiteEnum["ThetvdbSeason"] = "THETVDB_SEASON";
    MappingExternalSiteEnum["ThetvdbSeries"] = "THETVDB_SERIES";
    MappingExternalSiteEnum["Trakt"] = "TRAKT";
})(MappingExternalSiteEnum || (MappingExternalSiteEnum = {}));
var MappingItemEnum;
(function(MappingItemEnum) {
    MappingItemEnum["Anime"] = "ANIME";
    MappingItemEnum["Category"] = "CATEGORY";
    MappingItemEnum["Character"] = "CHARACTER";
    MappingItemEnum["Episode"] = "EPISODE";
    MappingItemEnum["Manga"] = "MANGA";
    MappingItemEnum["Person"] = "PERSON";
    MappingItemEnum["Producer"] = "PRODUCER";
})(MappingItemEnum || (MappingItemEnum = {}));
var MediaCategorySortEnum;
(function(MediaCategorySortEnum) {
    MediaCategorySortEnum["Ancestry"] = "ANCESTRY";
    MediaCategorySortEnum["CreatedAt"] = "CREATED_AT";
})(MediaCategorySortEnum || (MediaCategorySortEnum = {}));
var MediaCharacterSortEnum;
(function(MediaCharacterSortEnum) {
    MediaCharacterSortEnum["CreatedAt"] = "CREATED_AT";
    MediaCharacterSortEnum["Role"] = "ROLE";
    MediaCharacterSortEnum["UpdatedAt"] = "UPDATED_AT";
})(MediaCharacterSortEnum || (MediaCharacterSortEnum = {}));
var MediaProductionRoleEnum;
(function(MediaProductionRoleEnum) {
    MediaProductionRoleEnum["Licensor"] = "LICENSOR";
    MediaProductionRoleEnum["Producer"] = "PRODUCER";
    MediaProductionRoleEnum["Serialization"] = "SERIALIZATION";
    MediaProductionRoleEnum["Studio"] = "STUDIO";
})(MediaProductionRoleEnum || (MediaProductionRoleEnum = {}));
var MediaReactionSortEnum;
(function(MediaReactionSortEnum) {
    MediaReactionSortEnum["CreatedAt"] = "CREATED_AT";
    MediaReactionSortEnum["UpdatedAt"] = "UPDATED_AT";
    MediaReactionSortEnum["UpVotesCount"] = "UP_VOTES_COUNT";
})(MediaReactionSortEnum || (MediaReactionSortEnum = {}));
var MediaReactionVoteSortEnum;
(function(MediaReactionVoteSortEnum) {
    MediaReactionVoteSortEnum["CreatedAt"] = "CREATED_AT";
    MediaReactionVoteSortEnum["Following"] = "FOLLOWING";
})(MediaReactionVoteSortEnum || (MediaReactionVoteSortEnum = {}));
var MediaTypeEnum;
(function(MediaTypeEnum) {
    MediaTypeEnum["Anime"] = "ANIME";
    MediaTypeEnum["Manga"] = "MANGA";
})(MediaTypeEnum || (MediaTypeEnum = {}));
var PostLikeSortEnum;
(function(PostLikeSortEnum) {
    PostLikeSortEnum["CreatedAt"] = "CREATED_AT";
    PostLikeSortEnum["Following"] = "FOLLOWING";
})(PostLikeSortEnum || (PostLikeSortEnum = {}));
var PostSortEnum;
(function(PostSortEnum) {
    PostSortEnum["CreatedAt"] = "CREATED_AT";
})(PostSortEnum || (PostSortEnum = {}));
var ProTierEnum;
(function(ProTierEnum) {
    ProTierEnum[/**
   * Aozora Pro (only hides ads)
   * @deprecated No longer for sale
   */ "AoPro"] = "AO_PRO";
    ProTierEnum[/**
   * Aozora Pro+ (only hides ads)
   * @deprecated No longer for sale
   */ "AoProPlus"] = "AO_PRO_PLUS";
    ProTierEnum[/** Top tier of Kitsu Pro */ "Patron"] = "PATRON";
    ProTierEnum[/** Basic tier of Kitsu Pro */ "Pro"] = "PRO";
})(ProTierEnum || (ProTierEnum = {}));
var RatingSystemEnum;
(function(RatingSystemEnum) {
    RatingSystemEnum[/** 1-20 in increments of 1 displayed as 1-10 in 0.5 increments */ "Advanced"] = "ADVANCED";
    RatingSystemEnum[/** 1-20 in increments of 2 displayed as 5 stars in 0.5 star increments */ "Regular"] = "REGULAR";
    RatingSystemEnum[/** 1-20 displayed as 4 smileys - Awful (1), Meh (8), Good (14) and Great (20) */ "Simple"] = "SIMPLE";
})(RatingSystemEnum || (RatingSystemEnum = {}));
var RecurringBillingServiceEnum;
(function(RecurringBillingServiceEnum) {
    RecurringBillingServiceEnum[/** Billed through Apple In-App Subscription */ "Apple"] = "APPLE";
    RecurringBillingServiceEnum[/** Billed through Google Play Subscription */ "GooglePlay"] = "GOOGLE_PLAY";
    RecurringBillingServiceEnum[/** Bill a PayPal account */ "Paypal"] = "PAYPAL";
    RecurringBillingServiceEnum[/** Bill a credit card via Stripe */ "Stripe"] = "STRIPE";
})(RecurringBillingServiceEnum || (RecurringBillingServiceEnum = {}));
var ReleaseSeasonEnum;
(function(ReleaseSeasonEnum) {
    ReleaseSeasonEnum[/** Released during the Fall season */ "Fall"] = "FALL";
    ReleaseSeasonEnum[/** Released during the Spring season */ "Spring"] = "SPRING";
    ReleaseSeasonEnum[/** Released during the Summer season */ "Summer"] = "SUMMER";
    ReleaseSeasonEnum[/** Released during the Winter season */ "Winter"] = "WINTER";
})(ReleaseSeasonEnum || (ReleaseSeasonEnum = {}));
var ReleaseStatusEnum;
(function(ReleaseStatusEnum) {
    ReleaseStatusEnum[/** This media is currently releasing */ "Current"] = "CURRENT";
    ReleaseStatusEnum[/** This media is no longer releasing */ "Finished"] = "FINISHED";
    ReleaseStatusEnum[/** The release date has not been announced yet */ "Tba"] = "TBA";
    ReleaseStatusEnum[/** This media is not released yet */ "Unreleased"] = "UNRELEASED";
    ReleaseStatusEnum[/** This media is releasing soon */ "Upcoming"] = "UPCOMING";
})(ReleaseStatusEnum || (ReleaseStatusEnum = {}));
var ReportReasonEnum;
(function(ReportReasonEnum) {
    ReportReasonEnum[/** No bulli! */ "Bullying"] = "BULLYING";
    ReportReasonEnum[/** Not Safe For Work */ "Nsfw"] = "NSFW";
    ReportReasonEnum["Offensive"] = "OFFENSIVE";
    ReportReasonEnum["Other"] = "OTHER";
    ReportReasonEnum["Spam"] = "SPAM";
    ReportReasonEnum["Spoiler"] = "SPOILER";
})(ReportReasonEnum || (ReportReasonEnum = {}));
var ReportStatusEnum;
(function(ReportStatusEnum) {
    ReportStatusEnum["Declined"] = "DECLINED";
    ReportStatusEnum["Reported"] = "REPORTED";
    ReportStatusEnum["Resolved"] = "RESOLVED";
})(ReportStatusEnum || (ReportStatusEnum = {}));
var SitePermissionEnum;
(function(SitePermissionEnum) {
    SitePermissionEnum[/** Administrator/staff member of Kitsu */ "Admin"] = "ADMIN";
    SitePermissionEnum[/** Moderator of community behavior */ "CommunityMod"] = "COMMUNITY_MOD";
    SitePermissionEnum[/** Maintainer of the Kitsu media database */ "DatabaseMod"] = "DATABASE_MOD";
})(SitePermissionEnum || (SitePermissionEnum = {}));
var SortDirection;
(function(SortDirection) {
    SortDirection["Ascending"] = "ASCENDING";
    SortDirection["Descending"] = "DESCENDING";
})(SortDirection || (SortDirection = {}));
var TitleLanguagePreferenceEnum;
(function(TitleLanguagePreferenceEnum) {
    TitleLanguagePreferenceEnum[/** Prefer the most commonly-used title for media */ "Canonical"] = "CANONICAL";
    TitleLanguagePreferenceEnum[/** Prefer the localized title for media */ "Localized"] = "LOCALIZED";
    TitleLanguagePreferenceEnum[/** Prefer the romanized title for media */ "Romanized"] = "ROMANIZED";
})(TitleLanguagePreferenceEnum || (TitleLanguagePreferenceEnum = {}));
var WikiSubmissionSortEnum;
(function(WikiSubmissionSortEnum) {
    WikiSubmissionSortEnum["CreatedAt"] = "CREATED_AT";
    WikiSubmissionSortEnum["UpdatedAt"] = "UPDATED_AT";
})(WikiSubmissionSortEnum || (WikiSubmissionSortEnum = {}));
var WikiSubmissionStatusEnum;
(function(WikiSubmissionStatusEnum) {
    WikiSubmissionStatusEnum["Approved"] = "APPROVED";
    WikiSubmissionStatusEnum["Draft"] = "DRAFT";
    WikiSubmissionStatusEnum["Pending"] = "PENDING";
    WikiSubmissionStatusEnum["Rejected"] = "REJECTED";
})(WikiSubmissionStatusEnum || (WikiSubmissionStatusEnum = {}));
const EpisodeInfoFragmentDoc = (external_graphql_tag_default())`
  fragment EpisodeInfo on Episode {
    number
    titles {
      canonical
    }
    thumbnail {
      original {
        url
      }
    }
  }
`;
const EpisodesListFragmentDoc = (external_graphql_tag_default())`
  fragment EpisodesList on Anime {
    episodeCount
    episodes(first: $first) {
      nodes {
        ...EpisodeInfo
      }
    }
  }
  ${EpisodeInfoFragmentDoc}
`;
const GetAnimesKitsuDocument = (external_graphql_tag_default())`
  query getAnimesKitsu($first: Int, $title: String!) {
    searchAnimeByTitle(title: $title, first: 5) {
      animes: nodes {
        id
        season
        startDate
        ...EpisodesList
      }
    }
  }
  ${EpisodesListFragmentDoc}
`;
const GetEpisodeKitsuDocument = (external_graphql_tag_default())`
  query getEpisodeKitsu($id: ID!, $first: Int) {
    findAnimeById(id: $id) {
      ...EpisodesList
    }
  }
  ${EpisodesListFragmentDoc}
`;
const defaultWrapper = (action, _operationName, _operationType)=>action()
;
function getSdk(client, withWrapper = defaultWrapper) {
    return {
        getAnimesKitsu (variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders)=>client.request(GetAnimesKitsuDocument, variables, {
                    ...requestHeaders,
                    ...wrappedRequestHeaders
                })
            , "getAnimesKitsu", "query");
        },
        getEpisodeKitsu (variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders)=>client.request(GetEpisodeKitsuDocument, variables, {
                    ...requestHeaders,
                    ...wrappedRequestHeaders
                })
            , "getEpisodeKitsu", "query");
        }
    };
}

// EXTERNAL MODULE: ./src/lib/constants.ts
var constants = __webpack_require__(8442);
;// CONCATENATED MODULE: ./src/lib/api.ts




const aniListClient = new external_graphql_request_.GraphQLClient(constants/* aniListEndpoint */.TS, {
    headers: {}
});
const kitsuClient = new external_graphql_request_.GraphQLClient(constants/* kitsuEndpoint */.gm, {
    headers: {}
});
const { indexPage , animePage , getList , searchAnime , getAnimeInfo , getPopularBanner , getAnimeBanner , getAnimeTitle , searchGenre , watchPage , getAnimeByIds ,  } = (0,aniList/* getSdk */.mK)(aniListClient);
// kitsu middleware to ignore error fields
const kitsuMiddleware = async (action)=>{
    let result = {};
    try {
        result = await action();
    } catch (err) {
        if (!(err instanceof external_graphql_request_.ClientError)) throw err;
        result = err.response.data;
    }
    return result;
};
const { getAnimesKitsu , getEpisodeKitsu  } = getSdk(kitsuClient, kitsuMiddleware);
/**
 * @example 'naruto', startDate: '2019', season: 'WINTER'
 */ const getKitsuEpisodes = async (title, season, startDate)=>{
    if (!title) {
        return {
            episodeCount: 0,
            episodes: {
                nodes: []
            }
        };
    }
    const kitsuAnimes = await getAnimesKitsu({
        title,
        first: 8
    });
    let kitsuAnime = kitsuAnimes.searchAnimeByTitle.animes.filter((r)=>{
        // return if the anime doesn't exists
        if (!r) return false;
        // return false if the startDate doesn't exist
        if (!r.startDate) return false;
        // only return false if the season exists and doesn't
        // match with the kitsu one
        if (r.season !== season && season) return false;
        return r.startDate.trim().split("-")[0] === startDate.toString();
    })[0];
    if (kitsuAnime === undefined) {
        kitsuAnime = {
            id: "-1",
            episodeCount: 0,
            episodes: {
                nodes: []
            }
        };
    }
    if (kitsuAnime.episodeCount === null) {
        kitsuAnime.episodeCount = kitsuAnime.episodes.nodes.length;
    }
    return kitsuAnime;
};


/***/ }),

/***/ 8442:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O8": () => (/* binding */ proxyFreeUrls),
/* harmony export */   "TS": () => (/* binding */ aniListEndpoint),
/* harmony export */   "gm": () => (/* binding */ kitsuEndpoint)
/* harmony export */ });
const aniListEndpoint = "https://graphql.anilist.co";
const kitsuEndpoint = "https://kitsu.io/api/graphql";
const proxyFreeUrls = /(gogocdn\.stream)|(manifest\.prod\.boltdns\.net)/;


/***/ }),

/***/ 2426:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "YE": () => (/* binding */ base64SolidImage)
/* harmony export */ });
/* unused harmony exports toBase64, solidImage */
const toBase64 = (str)=>Buffer.from(str).toString("base64")
;
const solidImage = (color)=>`
  <svg width="1" height="1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect width="1" height="1" style="fill:${color};stroke-width:3;stroke:${color}" />
  </svg>
`
;
const base64SolidImage = (color)=>toBase64(solidImage(color))
;


/***/ })

};
;