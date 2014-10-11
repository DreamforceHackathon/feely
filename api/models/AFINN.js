/**
 * User
 *
 * @module      :: Model
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/10/10
 */

module.exports = (function(){

    var tableName = 'afinn_scores';

    var attributes = {
        word: {
            type: 'string',
            required: true
        },
        score: {
            type: 'integer',
            required: true
        }
    };

    if (process.env.NODE_ENV === 'development') {
        tableName += '_test';
    }

    return {
        tableName: tableName,
        attributes: attributes
    };
})();
