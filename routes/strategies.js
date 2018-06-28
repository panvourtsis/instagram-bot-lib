/**
 * Routes
 * =====================
 * Possible strategy
 *
 * @author:     Ilya Chubarov [@agoalofalife] <agoalofalife@gmail.com>
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 * 
 */
module.exports = {
    "likemode_classic": require("../modules/mode/likemode_classic"),
    "likemode_realistic": require("../modules/mode/likemode_realistic"),
    "likemode_superlike": require("../modules/mode/likemode_superlike"),
    "fdfmode_classic": require("../modules/mode/fdfmode_classic"),
    "fdfmode_defollowall": require("../modules/mode/fdfmode_defollowall"),
    "comment_mode": require("../modules/mode/commentmode_classic"),
    "likemode_competitor_users": require("../modules/mode/likemode_competitor_users")
};