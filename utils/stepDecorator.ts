import { test } from "@playwright/test";

export { expect } from "@playwright/test";
export function step(stepName?: string) {
  return function decorator(
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    return function replacementMethod(this: any, ...args: any[]) {
      const resolvedStepName = stepName
        ? stepName.replace(/{(\d+)}/g, (_, index) => String(args[+index]))
        : `${this.constructor.name}.${context.name as string}`;

      const result = target.apply(this, args);

      if (result instanceof Promise) {
        return test.step(resolvedStepName, () => result);
      }
      return result;
    };
  };
}
