import { synthesizeComponent } from 'react-state';
import { errorLogger } from './error-handle';

/**
 * Initiate array of bundled and synthesized routes to be rendered
 * @param {Array} list
 * @param {Array} definitions
 * @param {Function} executableFunction
 * @return {Array} list of bundled Routes
 */
function initSynthesizedRoutes(
  list: any,
  definitions: any,
  HOC?: Function
): Array<any> {
  try {
    return definitions.length
      ? definitions.map((oneRoute: any) => {
          const { key, ...rest } = oneRoute;
          if (list[key] && typeof list[key] === 'function') {
            return {
              ...rest,
              Component: HOC
                ? synthesizeComponent(HOC(list[key], key), rest)
                : synthesizeComponent(list[key], rest)
            };
          }
          throw `Error: Component not defined with key: ${key}`;
        })
      : [];
  } catch (err) {
    errorLogger(err);
    return [];
  }
}

export { initSynthesizedRoutes };
