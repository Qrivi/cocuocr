export default class MenuService {
    static async getCurrent() {
        try {
            return await new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve('whaddup broski');
                }, 300);
            });
        } catch (error) {
            throw error;
        }
    }
}
