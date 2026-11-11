import '../../../API/_GlobalFunctions.js';
import '../../../API/_StaticDefines.js';
import { Control as TcHmiControl } from '../TcHmiControl/TcHmiControl.esm.js';
import type { IControlSpecificData as ITcHmiControlSpecificData } from '../TcHmiControl/TcHmiControl.esm.js';
import { Control as TcHmiContent } from '../TcHmiContent/TcHmiContent.esm.js';
import * as Controls from '../../../API/Controls.js';
import type { ObjectResolver } from '../../../API/ObjectResolver.js';
import { EventProvider } from '../../../API/EventProvider.js';
import { LocalStorage } from '../../../API/LocalStorage.js';
import type { AttributeSetterOptions, Dictionary, ScaleModeString, SizeModeWithContent } from '../../../API/_Types.js';
import { TcHmiRegionZoom } from './TcHmiRegionZoom.js';
declare class TcHmiRegion extends TcHmiControl {
    #private;
    constructor(element: JQuery, pcElement: JQuery, attrs: Controls.ControlAttributeList);
    /** Html template loaded from templateCache. */
    protected __template: string | undefined;
    /**  Internal reference to the attribute "data-tchmi-target-content" */
    protected __targetContent: string | null | undefined;
    protected __targetContentMarkup: string | null | undefined;
    /** Current Content Markup */
    protected __targetMarkup: string | null;
    /** Current Content Object */
    protected __currentContent: TcHmiContent | null;
    protected __widthMode: SizeModeWithContent | undefined;
    protected __heightMode: SizeModeWithContent | undefined;
    /**  Internal reference to the attribute "data-tchmi-scale-mode" */
    protected __scaleMode: ScaleModeString | undefined;
    /**  Internal reference to the attribute "data-tchmi-size-mode" */
    protected __scrolling: 'No' | 'Yes' | 'Auto' | undefined;
    /**  Internal reference to the attribute "data-tchmi-zoom-and-pan" */
    protected __zoomAndPan: ZoomAndPan | undefined | null;
    /** Zoom & pan controller. Lazily created the first time zooming is enabled (zooming is off by default). */
    protected __zoomController: TcHmiRegionZoom | undefined;
    /** Stored zoom level and pan offset per content path. Only exists while the 'rememberView' sub-attribute is on. */
    protected __zoomAndPanStorage: LocalStorage<{
        views: Dictionary<ZoomAndPanView>;
    }, {
        views: ZoomAndPanView;
    }> | undefined;
    protected __elementTemplateRoot: JQuery;
    private __xhr;
    private __destroyRequestCurrentPartialContents;
    /** Timeout id for async compile new content */
    protected __processTargetMarkupCompileTimeout: number;
    /** Timeout id for async removing/restoring old content */
    protected __processTargetMarkupCleanupOldTimeout: number;
    protected readonly __processTargetMarkupLoadingSpinnerDiv: Element;
    protected __processTargetMarkupOldContent: TcHmiContent | null;
    /** if undefined we have no pending opacity restore */
    protected __processTargetMarkupOldContentOldOpacity: string | undefined;
    protected __asyncWorkData: IControlSpecificData;
    /**
     * If raised, the control object exists in control cache and constructor of each inheritation level was called.
     * This function is only to be used by the System. Other function calls are not intended.
     */
    __previnit(): void;
    /**
     * If raised, all attributes have been set to it's default or dom values.
     * This function is only to be used by the System. Other function calls are not intended.
     */
    __init(): void;
    /**
     * Is called by the system after the control instance gets part of the current DOM.
     * This function is only to be used by the System. Other function calls are not intended.
     */
    __attach(): void;
    /**
     * Is called by the system after the control instance is no longer part of the current DOM.
     * This function is only to be used by the System. Other function calls are not intended.
     */
    __detach(): void;
    /**
     * Destroy the current control instance.
     * Will be called automatically if system destroys control!
     */
    destroy(): void;
    /**
     * Sets __keepAlive
     * @param value
     */
    __setKeepAlive(value: boolean): void;
    /**
     * @param url
     */
    private __tryContentRefresh;
    protected __onContentCreated(_event: EventProvider.Event, data: {
        url: string;
    }): void;
    protected __onContentRemoved(_event: EventProvider.Event, data: {
        url: string;
    }): void;
    protected __onResized(_event: EventProvider.Event, ctrl: TcHmiControl): void;
    protected __doAsyncWork(timestamp?: number): void;
    /**
     * Checks if partial does alredy exist in parent hierarchy of current region instance!
     * @param path The url of the partial to check.
     */
    protected __isRecursionSave(path: string): boolean;
    /**
     * Sets the value of the width mode attribute.
     * @param valueNew The new width mode value..
     */
    setWidthMode(valueNew: SizeModeWithContent | null): void;
    /**
     * Processes the current width and width unit.
     */
    __processWidth(callerControl?: TcHmiControl): void;
    /**
     * Sets the value of the height mode attribute.
     * @param valueNew The new height mode value..
     */
    setHeightMode(valueNew: SizeModeWithContent | null): void;
    /**
     * Processes the current height and height unit.
     */
    __processHeight(callerControl?: TcHmiControl): void;
    __getContentWidth(): number | null;
    __getContentHeight(): number | null;
    /**
     * Sets the content value and calls the associated process function (processContent).
     * @param valueNew The new value for the content attribute as string. Relative path value.
     */
    setTargetContent(valueNew: string | null): void;
    /**
     * Returns the current content value.
     * @returns The current value of the content member variable as string. Relative path value.
     */
    getTargetContent(): string | null | undefined;
    /**
     * Destroy and remove currently existing content...
     */
    private __destroyAndRemoveTargetCtrl;
    /**
     * Reports Region measurement from detail information in an object.
     * Try `performance.getEntriesByType('measure')` in devTools
     */
    private __reportBenchmarkObject;
    /**
     * Processes the current content value.
     * @param override
     */
    protected __processTargetContent(override?: string | null): void;
    /**
     * Restore opacity of the old content.
     * Important when this is keepAlive.
     * @param benchmarkObj
     */
    protected __cleanUpPostAttach(benchmarkObj?: BenchmarkObject): void;
    protected __processTargetMarkup(controlId: string | undefined, benchmarkObj: BenchmarkObject): void;
    /**
     * Processes the current isEnabled attribute value and of its target.
     */
    __processIsEnabled(): void;
    /**
     * Processes the current AccessConfig attribute value and of its target.
     */
    __processAccessConfig(): void;
    setScaleMode(valueNew: ScaleModeString | null): void;
    getScaleMode(): ScaleModeString | undefined;
    protected __rescaleId: number;
    protected __processScaleMode(): void;
    setScrolling(valueNew: 'No' | 'Yes' | 'Auto' | null): void;
    getScrolling(): "Auto" | "No" | "Yes" | undefined;
    protected __processScrolling(): void;
    /**
     * Sets the value of the "data-tchmi-zoom-and-pan" attribute. When zooming is enabled the user can zoom the region
     * content with the mouse wheel while hovering the region.
     * @param valueNew The new value for zoom and pan.
     */
    setZoomAndPan(valueNew: ZoomAndPan | null, options?: AttributeSetterOptions): void;
    /**
     * The watch callback for the zoom and pan object resolver.
     */
    protected __onResolverForZoomAndPanCallback(data: ObjectResolver.IWatchResultObject<ZoomAndPan | null>): void;
    /**
     * Returns the current value of zoom and pan.
     */
    getZoomAndPan(): ZoomAndPan | null | undefined;
    /**
     * Registers or removes the DOM event listeners used for zooming based on the current zoom and pan value.
     * Resets the zoom factor when zooming gets disabled.
     */
    protected __processZoomAndPan(): void;
    /** Key under which the view of the currently loaded content is stored. */
    private __getZoomAndPanViewKey;
    /** Stores the current view for the loaded content, dropping the views of other contents unless they are kept. */
    private __storeZoomAndPanView;
    /**
     * Return the currently loaded TcHmiContent control object.
     */
    getCurrentContent(): TcHmiContent | null;
    /**
     * Sets the current zoom level and pan position of the region content. Only has an effect while Zoom and Pan is
     * enabled (the 'mode' of the 'data-tchmi-zoom-and-pan' attribute is 'Auto' or 'Toggle'). The configured start
     * view used by the reset button is not changed.
     * @param zoomLevel The new zoom level in percent, clamped to the configured min/max zoom range. Null keeps the current zoom.
     * @param positionX The new horizontal pan offset in pixels. Null keeps the current position.
     * @param positionY The new vertical pan offset in pixels. Null keeps the current position.
     * @returns True if Zoom and Pan is enabled and the view was applied, otherwise false.
     */
    setZoomAndPanView(zoomLevel: number | null, positionX: number | null, positionY: number | null): boolean;
    /**
     * Resets the zoom level and pan position of the region content to the configured start view, like the reset
     * button of the toolbox. Only has an effect while Zoom and Pan is enabled (the 'mode' of the
     * 'data-tchmi-zoom-and-pan' attribute is 'Auto' or 'Toggle').
     */
    resetView(): void;
}
export interface BenchmarkObject {
    targetContent: string | null;
    processStart: number;
    htmlFetchStart: number;
    htmlFetchEnd: number;
    compileStart: number;
    compileEnd: number;
    addContentToDomStart: number;
    addContentToDomEnd: number;
    syncAttachStart: number;
    syncAttachEnd: number;
    asyncAttachStart: number;
    asyncAttachEnd: number;
    screenUpdated: number;
    removeContentFromDomStart: number;
    removeContentFromDomEnd: number;
}
export interface IControlSpecificData extends ITcHmiControlSpecificData {
    'System.TcHmiRegion.resized': boolean;
}
/** Value of the "data-tchmi-zoom-and-pan" attribute. */
export interface ZoomAndPan {
    /** Controls whether the user can zoom/pan the region content: 'Off', 'Auto' or 'Toggle'. */
    mode?: ZoomMode | null;
    /** Minimum zoom level in percent the content can be zoomed to. Only applied while zooming is active. */
    minZoomLevel?: number | null;
    /** Maximum zoom level in percent the content can be zoomed to. Only applied while zooming is active. */
    maxZoomLevel?: number | null;
    /** Initial zoom level in percent the content starts at. Only applied while zooming is active. */
    initialZoomLevel?: number | null;
    /** Initial horizontal pan offset in px the content starts at. Only applied while zooming is active. */
    initialPositionX?: number | null;
    /** Initial vertical pan offset in px the content starts at. Only applied while zooming is active. */
    initialPositionY?: number | null;
    /** Controls how far the content can be panned: 'Free' allows moving it out of the region, 'KeepContentInFrame' keeps it inside. Only applied while zooming is active. */
    panBounds?: PanBounds | null;
    /** Controls what happens per direction while the content is small enough to fit into the region: 'KeepPan' keeps panning enabled, 'LockCenter' centers the content on that axis and disables panning there. Only applied while zooming is active. */
    whenContentFits?: WhenContentFits | null;
    /** If 'true' (default) the zoom in (+) and zoom out (-) toolbox buttons are shown. The reset button is always shown. Only applied while zooming is active. */
    showZoomButtons?: boolean | null;
    /** Controls whether the zoom level and pan offset are stored and restored: not at all, for the currently loaded content or per content. Only applied while zooming is active. */
    rememberView?: RememberView | null;
    /** Controls when the minimap preview is shown. Only applied while zooming is active. */
    previewVisibility?: PreviewVisibility | null;
    /** Controls whether the minimap preview renders a static content snapshot. 'Interval' can have a performance impact. Only applied while zooming is active. */
    previewSnapshot?: PreviewSnapshot | null;
    /** Time in milliseconds after which the static content snapshot is created and, with 'Interval', refreshed. Only applied when Preview Snapshot is 'Initial' or 'Interval'. */
    snapshotTime?: number | null;
}
/** Value of the "mode" sub-attribute of "data-tchmi-zoom-and-pan". */
export type ZoomMode = 'Off' | 'Auto' | 'Toggle';
/** Value of the "panBounds" sub-attribute of "data-tchmi-zoom-and-pan". */
export type PanBounds = 'Free' | 'KeepContentInFrame';
/** Value of the "whenContentFits" sub-attribute of "data-tchmi-zoom-and-pan". */
export type WhenContentFits = 'KeepPan' | 'LockCenter';
/** Value of the "rememberView" sub-attribute of "data-tchmi-zoom-and-pan". */
export type RememberView = 'No' | 'ForCurrentContent' | 'ForEachContent';
/** Zoom level in percent and pan offset in px stored by the "rememberView" sub-attribute of "data-tchmi-zoom-and-pan". */
export interface ZoomAndPanView {
    /** Stored zoom level in percent. */
    zoomLevel: number;
    /** Stored horizontal pan offset in px. */
    positionX: number;
    /** Stored vertical pan offset in px. */
    positionY: number;
}
/** Value of the "previewVisibility" sub-attribute of "data-tchmi-zoom-and-pan". */
export type PreviewVisibility = 'Always' | 'Never' | 'OnlyWhenZoomedIn' | 'WhenContentOverflows';
/** Value of the "previewSnapshot" sub-attribute of "data-tchmi-zoom-and-pan". */
export type PreviewSnapshot = 'No' | 'Initial' | 'Interval';
export { TcHmiRegion as Control };
//# sourceMappingURL=TcHmiRegion.esm.d.ts.map