/**
 * A type that returns a `get` method after attempting to process parameters.
 */
export type ArgumentStore = Map<string, string | string[] | boolean>;

/**
 * Utility for parsing script startup parameters.
 *
 * Types of script parameters:
 *      keyWithoutValue - key without value.
 *      keylessValue - param without key.
 *      --key=value - primitive type value with key.
 *      --collectionKey[]=value1,value2 - array type value with key. Values ​​are comma separated.
 *
 * Example:
 *
 * node script.js --keyWithoutValue keylessValue1 --key=value --collectionKey[]=value1,value2
 */
export class ArgumentParser {
    static DEFAULT_KEY = '_';

    private static KEY_PREFIX = '-';
    private static EXPRESSION_SIGN = '=';
    private static LIST_TYPE_KEY = '[]';
    private static LIST_VALUE_SEPARATOR = ',';

    /**
     * Get parsed arguments.
     *
     * @param rawArgs Collection of raw arguments.
     * @return Argument store.
     */
    get(rawArgs: string[]): ArgumentStore {
        const keylessValues = rawArgs.filter(arg => !arg.startsWith(ArgumentParser.KEY_PREFIX));
        const valuesWithKey = rawArgs.filter(arg => arg.startsWith(ArgumentParser.KEY_PREFIX));

        const booleanValues = valuesWithKey.filter(arg => !this.isExpression(arg));
        const booleanEntries = booleanValues.map(key => [this.getKeyFromRawKey(key), true]);

        const expressions = valuesWithKey.filter(arg => this.isExpression(arg));
        const expressionEntries = expressions.map(expr => expr.split(ArgumentParser.EXPRESSION_SIGN))
            .map(([rawKey, rawValue]) => {
                const isListType = this.isListTypeExpression(rawKey);
                const key = this.getKeyFromRawKey(rawKey);
                const value = isListType ? rawValue.split(ArgumentParser.LIST_VALUE_SEPARATOR) : rawValue;
                return [key, value];
            });

        return new Map([
            ...(keylessValues.length ? [[ArgumentParser.DEFAULT_KEY, keylessValues]] : []),
            ...booleanEntries,
            ...expressionEntries
        ] as [string, boolean | string | string[]][]);
    }

    // noinspection JSMethodCanBeStatic
    private getKeyFromRawKey(rawKey: string): string {
        return rawKey.replace(/^-+/, '')
            .replace(ArgumentParser.LIST_TYPE_KEY, '');
    }

    // noinspection JSMethodCanBeStatic
    private isExpression(arg: string): boolean {
        return arg.includes(ArgumentParser.EXPRESSION_SIGN);
    }

    // noinspection JSMethodCanBeStatic
    private isListTypeExpression(expr: string): boolean {
        return expr.endsWith(ArgumentParser.LIST_TYPE_KEY);
    }
}
