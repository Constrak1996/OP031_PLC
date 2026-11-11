/**
 * Encapsulates the user zoom & pan feature of TcHmiRegion: mouse wheel zoom, drag panning,
 * single-finger touch pan + two-finger pinch zoom and the zoom in / zoom out / reset toolbox.
 *
 * The owning region provides the template root element (the zoom target and gesture host) and an `onChange` callback
 * which re-applies the scale (TcHmiRegion.__processScaleMode). That callback reads back the current `factor`, `panX`
 * and `panY` from this object.
 */
export declare class TcHmiRegionZoom {
    private readonly __root;
    private readonly __onChange;
    private readonly __getContent;
    private readonly __getText;
    /**
     * Default min/max zoom factor and the multiplicative step per zoom action. All values are zoom factors where
     * 1 = 100% (the public zoom levels are given in percent, e.g. 100 = 100%, and divided by 100 into these factors).
     */
    private static readonly __config;
    /** Longer-edge size (px) of the minimap preview thumbnail. */
    private static readonly __previewMaxSize;
    /** Movement (client px) a press must exceed before the region claims it as a pan ("touch slop"). */
    private static readonly __panThreshold;
    /** Current zoom factor applied by the user via the mouse wheel. Multiplied onto the scale mode transform. */
    private __zoomFactor;
    /** True while listeners are attached (zooming enabled). */
    private __enabled;
    /** Destroy functions for the DOM event listeners registered by __attachListeners, called by __detachListeners. */
    private __listeners;
    /** Horizontal pan offset (in client px) applied together with the zoom factor to keep the zoom anchor fixed. */
    private __panX;
    /** Vertical pan offset (in client px) applied together with the zoom factor to keep the zoom anchor fixed. */
    private __panY;
    /** Initial zoom factor the view returns to on reset. Set from the configured initial zoom level. */
    private __initialZoomFactor;
    /** Initial (start) horizontal pan offset the view returns to on reset. Set from the configured initial position. */
    private __initialPanX;
    /** Initial (start) vertical pan offset the view returns to on reset. Set from the configured initial position. */
    private __initialPanY;
    /** Minimum allowed zoom factor. Defaults to the configured minimum and can be changed via setZoomLimits. */
    private __minZoomFactor;
    /** Maximum allowed zoom factor. Defaults to the configured maximum and can be changed via setZoomLimits. */
    private __maxZoomFactor;
    /**
     * State of the active mouse drag-pan (left button). `pointerId` is null when not panning; `lastX`/`lastY`
     * hold the previous pointer position (client px) used to compute movement deltas.
     */
    private __drag;
    /** Active touch points (id -> last client position). Used to drive single-finger pan + two-finger pinch zoom. */
    private __touches;
    /** Reference for the running pinch: previous finger distance. `dist` is 0 when not pinching. */
    private __pinch;
    /**
     * A press in 'Auto' mode that has not yet been claimed as a pan: null when idle. Kept until the movement threshold
     * is crossed (then the region takes over) or the pointer is released (then it was a tap handled by the content).
     */
    private __pending;
    /** True when the zoom mode is 'Toggle': the toolbox shows a button switching region zoom/pan vs content interaction. */
    private __toggleMode;
    /**
     * Only meaningful in 'Toggle' mode: true while region zoom/pan is the active interaction. The gestures are then on
     * and pointerdown events are blocked from the content controls; false lets the content controls interact normally.
     * Ignored outside toggle mode, where the gestures are always active.
     */
    private __panActive;
    /** Toolbox overlay holding the zoom in / zoom out / reset buttons. Created while zooming is enabled. */
    private __toolbox;
    /**
     * Non-scrolling overlay layer that hosts the toolbox and preview. It spans the region and sits above the template.
     * The overlays live here (not inside the template) so they stay fixed in their corners even when the template gets
     * a scroll offset (native scrollbars via `Scrolling=Yes` or the browser's focus auto-scroll on `overflow:hidden`).
     */
    private __overlayHost;
    /**
     * Observes the template root so the overlay host insets are re-evaluated when its size or scrollbar presence
     * changes: once initially (after a page reload once the async content is laid out), on region resize, and when a
     * native scrollbar appears/disappears (its content box then changes). Created with the overlay host.
     */
    private __rootResizeObserver;
    /** Whether the zoom in (+) / zoom out (-) toolbox buttons should be shown. The reset button is always shown. */
    private __showZoomButtons;
    /** Controls whether the content may be panned out of the region or has to stay inside of it. */
    private __panBounds;
    /** Controls what happens on an axis while the content is small enough to fit into the region: keep panning or lock it. */
    private __whenContentFits;
    /** Pan offset of the last applied view. Lets __constrainPan derive the pan free bounds from a measurement of it. */
    private __appliedPanX;
    /** Vertical counterpart of __appliedPanX. */
    private __appliedPanY;
    /** Zoom factor of the last applied view. The rendered content size scales with it, whatever the scale mode is. */
    private __appliedZoomFactor;
    /** Controls when the minimap preview is shown: always, never, only while zoomed in or whenever the content does not fit the region. */
    private __previewMode;
    /** Controls whether the preview shows only the viewport or also a static content snapshot, created once or refreshed at an interval. */
    private __previewSnapshot;
    /** Time in ms after which a static content snapshot is created and, in the 'Interval' mode, refreshed. */
    private __snapshotTime;
    /** Timer that creates and refreshes the static content snapshot. */
    private __snapshotTimer;
    /** Whether the one-time snapshot of the 'Initial' mode has already been created. */
    private __initialSnapshotCreated;
    /** Minimap preview overlay (scaled content thumbnail + viewport rectangle). Shown only while zoomed in. */
    private __preview;
    /** The rectangle inside the preview marking the currently visible section. */
    private __previewViewport;
    /** Container holding the optional static content snapshot. */
    private __previewContent;
    /** True while the user is dragging inside the preview to pan the main view. */
    private __previewDragging;
    /** Pointer ids of active content control interactions that pause snapshot refreshes. */
    private __snapshotBlockingContentPointerIds;
    /** Whether the running gesture moved the view. A tap or click must not end in a final view. */
    private __gestureChangedView;
    /** Trailing timer that turns a burst of wheel zoom steps into a single final view. */
    private __wheelEndTimer;
    /**
     * @param __root The region template root element (zoom target and gesture host).
     * @param __onChange Re-applies the scale to the content; reads back `factor`, `panX` and `panY`. `final` is true
     * for a final view (gesture ended, button, public API) and false for the frames of an ongoing gesture.
     * @param __getContent Returns the currently shown content element (for the preview thumbnail), if any.
     * @param __getText Returns the localized text of the region for the given key (used for the button tooltips).
     */
    constructor(__root: HTMLElement, __onChange: (final: boolean) => void, __getContent: () => HTMLElement | undefined, __getText: (key: string) => string);
    /** Applies the change to the content (re-render) and refreshes the minimap preview. */
    private __applyView;
    /**
     * Applies the position constraints to the pan offset. Both axes are constrained on their own: an axis the content
     * fits into is locked to the placement configured by 'whenContentFits', an axis it does not fit into is kept
     * inside the region while 'KeepContentInFrame' is configured.
     */
    private __constrainPan;
    /**
     * The relative placement inside the region the content is locked to on an axis it fits into (0 = left/top,
     * 0.5 = center, 1 = right/bottom), or undefined while panning stays enabled. No 'default' case, so a new
     * 'whenContentFits' value fails the build (noImplicitReturns) instead of silently keeping panning enabled.
     */
    private __lockAlignment;
    /**
     * Whether panning is switched off on both axes because the content fits into the region and 'whenContentFits'
     * locks it in place. Keeps a drag from taking the gesture over from the content controls for nothing.
     */
    private __panFullyLocked;
    /**
     * Constrains the pan offset of one axis: the content is placed at the configured position while it fits the axis,
     * otherwise its edges are kept from moving inside the region ('KeepContentInFrame'). Content larger and content
     * smaller than the region are the same interval, just with swapped ends.
     * @param pan Current pan offset.
     * @param contentOffset Offset of the content edge relative to the region edge without any pan applied.
     * @param contentSize Rendered size of the content at the current zoom factor.
     * @param regionSize Visible size of the region.
     * @param alignFactor Placement the content is locked to while it fits this axis (0 = start, 0.5 = center, 1 = end), or undefined to keep panning enabled.
     */
    private __constrainPanAxis;
    /** Current zoom factor (read by the region while applying the scale). */
    get zoomFactor(): number;
    /** Current horizontal pan offset in client px. */
    get panX(): number;
    /** Current vertical pan offset in client px. */
    get panY(): number;
    /** True while the content is shown in the initial view, i.e. the state the reset button returns to. */
    get isAtInitialView(): boolean;
    /** Enables zooming: attaches the DOM listeners and shows the toolbox. */
    enable(): void;
    /** Disables zooming: removes the listeners and toolbox and clears the zoom so the content is shown unscaled. */
    disable(): void;
    /** Removes all listeners and the toolbox without resetting (used when the region is destroyed). */
    destroy(): void;
    /**
     * Shows or hides the zoom in (+) and zoom out (-) toolbox buttons. The reset/center button is always shown.
     * Takes effect immediately while zooming is enabled; otherwise it is applied the next time the toolbox is created.
     * @param show True to show the zoom in / zoom out buttons, false to hide them.
     */
    setShowZoomButtons(show: boolean): void;
    /**
     * Sets whether the content may be panned out of the region. Takes effect with the next view change.
     * @param bounds 'Free' to allow moving the content out of the region, 'KeepContentInFrame' to keep it inside.
     */
    setPanBounds(bounds: 'Free' | 'KeepContentInFrame'): void;
    /**
     * Sets what happens on an axis while the content is small enough to fit into the region. Takes effect with the
     * next view change.
     * @param mode 'KeepPan' to keep panning enabled, 'LockCenter' to center the content and disable panning.
     */
    setWhenContentFits(mode: 'KeepPan' | 'LockCenter'): void;
    /**
     * Enables or disables the 'Toggle' zoom mode. In toggle mode the toolbox shows a button switching between
     * region zoom/pan and interaction with the content; the zoom/pan gestures and the pointerdown takeover of the
     * content are only active while zoom/pan is selected. Outside toggle mode the gestures are always active.
     * @param enabled True for the 'Toggle' zoom mode, false for the always-on 'Auto' zoom mode.
     */
    setToggleMode(enabled: boolean): void;
    /**
     * Sets when the minimap preview is shown. Takes effect immediately.
     * @param mode 'Always', 'Never', 'OnlyWhenZoomedIn' or 'WhenContentOverflows'.
     */
    setPreviewVisibility(mode: 'Always' | 'Never' | 'OnlyWhenZoomedIn' | 'WhenContentOverflows'): void;
    /**
     * Sets whether the minimap preview renders a static content snapshot. 'No' shows only the visible section,
     * 'Initial' creates the snapshot once after the configured snapshot time and 'Interval' additionally refreshes it
     * at that rate.
     * @param snapshot 'No', 'Initial' or 'Interval'.
     */
    setPreviewSnapshot(snapshot: 'No' | 'Initial' | 'Interval'): void;
    /**
     * Sets the time after which the static content snapshot is created and, in the 'Interval' mode, refreshed.
     * @param time Time in milliseconds. Values less than or equal to 0 restore the default of 5000 ms.
     */
    setSnapshotTime(time: number | null): void;
    /**
     * Re-evaluates the minimap preview visibility and viewport rectangle. Called by the region after a resize so the
     * 'WhenContentOverflows' mode reacts when the content starts or stops fitting the region.
     */
    refreshPreview(): void;
    /**
     * Drops the static content snapshot of the previous content and lets it be created again after the configured
     * snapshot time. Called by the region once new content is laid out.
     */
    contentChanged(): void;
    /** Discards the static content snapshot and restarts the timer that creates it again. */
    private __resetSnapshot;
    /** Applies the current zoom in / zoom out button visibility to the toolbox, if it exists. */
    private __applyZoomButtonsVisibility;
    /**
     * Resets the zoom factor and pan offset to the configured initial (start) view. The change is applied in the next
     * animation frame instead of synchronously inside the click handler: applying a (possibly large) jump together
     * with the compositor's frame avoids forcing a synchronous relayout/repaint, which can freeze the page when
     * centering from a very high zoom on complex content.
     */
    reset(): void;
    /**
     * Sets the initial view (zoom factor and pan offset) the region content starts at and returns to on reset, e.g.
     * from the configured initial zoom level and initial position. The factor is clamped to the configured min/max zoom range.
     * @param zoomFactor Initial zoom factor (1 = 100%, no zoom). Null keeps the default of 1.
     * @param panX Initial horizontal pan offset in client px. Null keeps the default of 0.
     * @param panY Initial vertical pan offset in client px. Null keeps the default of 0.
     */
    setInitialView(zoomFactor: number | null, panX: number | null, panY: number | null): void;
    /**
     * Sets the current view (zoom factor and pan offset) without changing the configured initial (start) view used on
     * reset. The factor is clamped to the configured min/max zoom range. A null argument keeps the current value unchanged.
     * @param zoomFactor New zoom factor (1 = 100%, no zoom). Null keeps the current zoom.
     * @param panX New horizontal pan offset in client px. Null keeps the current position.
     * @param panY New vertical pan offset in client px. Null keeps the current position.
     */
    setView(zoomFactor: number | null, panX: number | null, panY: number | null): void;
    /**
     * Attaches the zoom related DOM event listeners on the template root element.
     */
    private __attachListeners;
    /**
     * Removes the zoom related DOM event listeners.
     */
    private __detachListeners;
    /**
     * Returns the non-scrolling overlay host, creating and inserting it on first use. It is appended to the region
     * control root (the template's parent) which never scrolls, so the toolbox and preview anchored inside it stay in
     * their corners regardless of the template's scroll position. Falls back to the template root if no parent exists.
     */
    private __ensureOverlayHost;
    /**
     * Keeps the overlay host aligned with the template's visible (client) area so the toolbox and preview sit next to
     * the native scrollbars instead of on top of them when `Scrolling=Yes` shows them. The scrollbar sizes are the
     * template's border box minus its client box; they are 0 (host spans the whole region) when no scrollbars show.
     */
    private __updateOverlayHostInsets;
    /** Removes the overlay host layer and stops observing the template root. */
    private __removeOverlayHost;
    /**
     * Creates the toolbox overlay with the zoom in (+), zoom out (-) and reset/center buttons and wires their click
     * handlers. The toolbox is modelled after the EcDiagnostics package toolbox. Does nothing if it already exists.
     */
    private __createToolbox;
    /** Applies the localized tooltip and accessible name to the toolbox buttons. Call again on a locale change. */
    applyButtonTexts(): void;
    /**
     * Removes the toolbox overlay and unwires its click handlers.
     */
    private __removeToolbox;
    /** Handles a click on the zoom in (+) toolbox button. */
    private __onZoomInButton;
    /** Handles a click on the zoom out (-) toolbox button. */
    private __onZoomOutButton;
    /** Handles a click on the reset/center toolbox button. */
    private __onResetButton;
    /** Handles a click on the toggle toolbox button: switches between region zoom/pan and content interaction. */
    private __onToggleButton;
    /** Shows the toggle button only in 'Toggle' mode. */
    private __applyToggleButtonVisibility;
    /** Reflects the current pan-active state on the toggle button (active class + aria-pressed). */
    private __applyToggleButtonState;
    /**
     * Applies a multiplicative zoom step to the current zoom factor and updates the rendered scale.
     * The point under the given anchor (mouse cursor or, if omitted, the region center) is kept fixed while zooming.
     * @param zoomIn True to zoom in, false to zoom out.
     * @param anchorClientX Optional horizontal anchor in client (viewport) coordinates.
     * @param anchorClientY Optional vertical anchor in client (viewport) coordinates.
     * @param final Whether the resulting view is final. False for a wheel step, which is part of a running burst.
     */
    private __applyZoomStep;
    /**
     * Applies a wheel zoom step and restarts the trailing timer that ends the wheel gesture. A wheel burst (trackpad
     * pinch, continuous scrolling) therefore produces a single final view instead of one per event.
     */
    private __applyWheelZoomStep;
    /** Restarts the trailing timer that turns a burst of wheel steps into a single final view. */
    private __restartWheelEndTimer;
    /** Clamps a zoom factor to the current min/max range. */
    private __clampZoom;
    /**
     * Sets the allowed zoom range. A null limit falls back to the corresponding configured default. The values are
     * applied as configured - there is no fixed upper/lower cap; only min <= max and strictly positive factors are
     * enforced (a factor of 0 or less would divide by zero / collapse the content). The current zoom factor
     * and the initial (start) factor are re-clamped into the new range.
     * @param minZoomFactor New minimum zoom factor (1 = 100%). Null restores the default minimum.
     * @param maxZoomFactor New maximum zoom factor (1 = 100%). Null restores the default maximum.
     */
    setZoomLimits(minZoomFactor: number | null, maxZoomFactor: number | null): void;
    /**
     * Sets the zoom factor to `newZoom` while keeping the content point under the given anchor fixed by adjusting the
     * pan offset. Works at any zoom level (including below 100%) because panning uses a transform offset rather than
     * the scroll position. If the anchor is omitted, the region center is used.
     * @param newZoom The new (already clamped) zoom factor.
     * @param anchorClientX Optional horizontal anchor in client (viewport) coordinates.
     * @param anchorClientY Optional vertical anchor in client (viewport) coordinates.
     */
    private __applyAnchoredZoom;
    /**
     * Cumulative scale applied to this region by enclosing zoomed/scaled containers. Pan offsets are stored in the
     * region's own layout px while pointer coordinates are in client (viewport) px; dividing a client delta by this
     * value converts it back to layout px. Returns 1 when the region is rendered unscaled or its size is unknown.
     */
    private __getLocalScale;
    /**
     * Whether the zoom/pan gestures (wheel, drag, pinch) should currently act. Always true while enabled outside
     * 'Toggle' mode; in toggle mode only while region zoom/pan is the selected interaction.
     */
    private __gesturesActive;
    /**
     * Handles mouse wheel zooming.
     * @param event The wheel event.
     */
    private __onWheel;
    /**
     * Handles a pointer press in the bubble phase (always-on 'Auto' zoom mode). The press is not committed yet: it is
     * remembered as "pending" so a tap/click still reaches the content control. Only once the pointer moves past the
     * threshold does the region take the gesture over and pan (@see {@link __onPointerMove}). A nested control that claims the
     * pointer by calling stopPropagation on its pointerdown keeps the region from ever going pending. Two fingers are
     * an unambiguous pinch and are claimed immediately. In 'Toggle' mode the capture-phase handler decides instead.
     * @param event The pointerdown event.
     */
    private __onPointerDown;
    /**
     * Capture-phase handler used only in 'Toggle' mode while region zoom/pan is active. It stops the pointerdown and
     * the legacy mouse/touch events (mousedown, mouseup, click, touchstart) before they reach the content controls, so
     * those controls (which listen on the pointer events and/or these legacy events) are not interacted with while the
     * region is panned/zoomed. From the pointerdown it starts the region pan/pinch and from the wheel it zooms. The
     * region's own overlays (toolbox, preview) are left alone so they stay clickable.
     * @param event The pointer, mouse, touch or wheel event.
     */
    private __onContentInteractionCapture;
    /**
     * Starts the pan (mouse/pen or single-finger touch) or pinch (two-finger touch) gesture from a pointerdown.
     * - Touch: a single finger starts a drag pan (like the mouse). A second finger starts a two-finger pinch zoom.
     * - Mouse/pen: panning starts with the left button.
     * @param event The pointerdown event.
     */
    private __startGesture;
    /**
     * Promotes the current pending press to a region pan: captures the pointer so the pan keeps tracking outside the
     * region.
     * @param event The pointermove that crossed the movement threshold.
     */
    private __takeOverPending;
    /**
     * Updates the two-finger pinch zoom (touch) or the drag-pan (mouse/pen or single-finger touch) as pointers move.
     * Also promotes a pending press to a pan once the movement crosses the threshold.
     * @param event The pointermove event.
     */
    private __onPointerMove;
    /** Applies the change in finger distance as a zoom anchored at the midpoint between the two fingers. */
    private __applyPinch;
    /**
     * Updates gesture state on pointerup / pointercancel: drops the lifted touch / ends the mouse pan. A pinch can no
     * longer continue once fewer than two fingers remain.
     * @param event The pointerup or pointercancel event.
     */
    private __onPointerUp;
    /** Clears all gesture state. Safe to call at any time. */
    private __resetGesture;
    /**
     * Suppresses the browser's native scroll/zoom while a touch gesture (single-finger pan or two-finger pinch) is in
     * progress. preventDefault is only called while at least one tracked finger is down and the event is still
     * cancelable (the browser ignores - and warns about - canceling a touchmove once a scroll has already committed).
     * @param event The touchmove event.
     */
    private __onTouchMove;
    /** Starts or stops the timer used to create and refresh static content snapshots. */
    private __syncSnapshotRefreshTimer;
    /** Stops the timer used to create and refresh static content snapshots. */
    private __stopSnapshotTimer;
    /** Tracks a pointer until the region's bubble handler proves no child control claimed it. */
    private __onPointerDownCapture;
    /**
     * Creates the static content snapshot after the configured snapshot time and, in the 'Interval' mode, refreshes it
     * at that rate. Ticks during active pan, pinch, preview drag or child control interactions are intentionally
     * ignored to avoid expensive cloning; the next tick creates or refreshes the snapshot afterward.
     */
    private __refreshSnapshotContent;
    /**
     * Builds/updates the minimap preview with a rectangle marking the currently visible section. A static content
     * snapshot is refreshed at the configured interval, while every zoom/pan change just repositions the rectangle.
     */
    private __syncPreviewState;
    /**
     * Returns whether the rendered content is larger than the visible region, i.e. it does not fully fit and panning
     * would be needed to reach all of it. Uses the rendered bounding rects so the current zoom factor and the region's
     * scale mode are both taken into account (a zoomed-in view overflows and therefore counts as not fitting).
     */
    private __contentOverflowsRegion;
    /** Creates the preview container, optionally a scaled-down content snapshot, and the viewport rectangle. */
    private __buildPreview;
    /** Updates the preview dimensions to match the current content dimensions. */
    private __resizePreview;
    /** Updates only the static snapshot content so the preview container keeps its event listeners and pointer capture. */
    private __replaceSnapshotContent;
    /**
     * Copies the rendered bitmap of every <canvas> in the source into the matching cloned canvas, because cloneNode
     * only copies the element and not its pixels. Best effort: the source order is assumed to match and any failure
     * (e.g. a cross-origin tainted canvas) is ignored.
     */
    private __copyCanvasPixels;
    /** Removes the preview overlay and clears its references. */
    private __removePreview;
    /** Starts a preview drag and immediately moves the view to the pressed point. */
    private __onPreviewPointerDown;
    /** Continues a preview drag: keeps moving the view to follow the pointer. */
    private __onPreviewPointerMove;
    /** Ends a preview drag. */
    private __onPreviewPointerUp;
    /** Zooms the main view with the mouse wheel to the content point below the pointer. */
    private __onPreviewWheel;
    /**
     * Applies a zoom step towards the content point below the given preview point. The point does not jump into the
     * center: its distance to the center of the visible area shrinks by the zoom change, so repeated steps approach it.
     * @param zoomIn True to zoom in, false to zoom out.
     * @param clientX Pointer x in client (viewport) coordinates.
     * @param clientY Pointer y in client (viewport) coordinates.
     */
    private __zoomToPreviewPoint;
    /**
     * Pans the main view so the currently visible section is centered on the given preview point (client coords).
     * Panning does not change the content size, so a single application lands the center exactly on the point.
     * @param clientX Pointer x in client (viewport) coordinates.
     * @param clientY Pointer y in client (viewport) coordinates.
     */
    private __panToPreviewPoint;
}
//# sourceMappingURL=TcHmiRegionZoom.d.ts.map