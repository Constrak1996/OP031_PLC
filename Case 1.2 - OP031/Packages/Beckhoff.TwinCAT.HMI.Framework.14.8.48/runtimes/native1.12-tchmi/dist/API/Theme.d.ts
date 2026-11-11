import type { IResultObject } from './_Types.js';
import { Errors } from './_Types.js';
export * as Properties from './Theme.Properties.js';
export * as Resources from './Theme.Resources.js';
/**
 * Returns the active theme.
 * @preserve (Part of the public API)
 */
export declare function get(): string;
/**
 * Sets the active theme.
 * @param valueNew Name of the new theme.
 * @preserve (Part of the public API)
 */
export declare function set(valueNew: string): Errors;
/**
 * Returns all registered themes of the project and referenced packages.
 * @preserve (Part of the public API)
 */
export declare function getRegisteredThemes(): string[];
export interface Resource<T extends any> extends IResultObject {
    value: T | null;
    /** The value is generated from the control, the project or in error case from the system. */
    origin: 'control' | 'package' | 'project' | 'system';
    /** Resources of a control will get "Base" if they do not implement the current theme */
    originThemeName: string;
    /**
     * Base path for path values in the resource, with trailing slash.
     * Folder of the theme file the value was read from. An empty string if path values are already complete, like
     * the defaults of a user control parameter, or if the theme file is in the root folder.
     * If undefined, resolveBasePath falls back to the theme folder convention, for example for the defaults of a
     * control or when nothing was found.
     */
    basePath?: string;
}
//# sourceMappingURL=Theme.d.ts.map