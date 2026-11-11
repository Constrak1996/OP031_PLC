import { type AttributeSetterOptions, Controls, type Keyboard, type Locale, type ObjectResolver, type Symbol, TcHmiControl, type DestroyFunction, type FontFamily, type FontSizeUnit, type FontStyle, type FontWeight, type FourSidedCss, type HorizontalAlignment, type SolidColor } from 'Beckhoff.TwinCAT.HMI.Framework/index.esm.js';
import { ValueBuffer, InputProcessingPoint } from '../Helpers/TcHmiValueBuffer/ValueBuffer.js';
declare class TcHmiNumericInput extends TcHmiControl.Control {
    #private;
    constructor(element: JQuery, pcElement: JQuery, attrs: Controls.ControlAttributeList);
    /** Reference to the root dom element of the current control template as  jquery object. */
    protected __elementTemplateRoot: HTMLElement;
    /** Reference to the underlying html text textarea or input element as jquery object. */
    protected __elementInput: HTMLInputElement;
    /** Reference to the invalid notification label element as jquery object. */
    protected __elementInvalidNotificationLabel: HTMLLabelElement;
    protected __elementUnit: HTMLElement;
    /**
     * Is set to true if the control is locked and to false if the control is unlocked.
     * When the control is locked, calls to setValue are ignored.
     */
    protected __locked: boolean;
    /**  Internal reference to the attribute "data-tchmi-value-type" */
    protected __valueType: 'Number' | 'BigInt64' | 'UnsignedBigInt64' | undefined;
    /**  Internal reference to the attribute "data-tchmi-value" */
    protected __value: number | bigint | null | undefined;
    protected __valueInit: number | bigint | null | undefined;
    /** Value at focusin time */
    protected __oldValue: number | bigint | null | undefined;
    /** Value of the input element at focusin time */
    protected __oldStringValue: string;
    /** Last input string which could be converted into a number */
    protected __lastValidValue: number | bigint | undefined;
    /** Last value reported via onPropertyChanged (The value returned by getValue when onPropertyChanged was raised) */
    protected __lastReportedValue: number | bigint | null | undefined;
    /** Last input string which could be converted into a number */
    protected __lastInput: string | undefined;
    /** Last cursor position when there was a string entered that could be converted to a number */
    protected __lastSelection: {
        start: number | null;
        end: number | null;
        direction: 'forward' | 'backward' | 'none' | null;
    };
    /** Internal reference to the attribute "data-tchmi-min-value" */
    protected __maxValue: number | bigint | null | undefined;
    protected __maxValueInit: number | bigint | null | undefined;
    /** Internal reference to the attribute "data-tchmi-max-value" */
    protected __minValue: number | bigint | null | undefined;
    protected __minValueInit: number | bigint | null | undefined;
    /** Internal reference to the attribute "data-tchmi-decimal-digits" */
    protected __decimalDigits: number | null | undefined;
    /** Internal reference to the attribute "data-tchmi-unit" */
    protected __unit: string | null | undefined;
    /**  Internal reference to the attribute "data-tchmi-system-keyboard-input-mode" */
    protected __systemKeyboardInputMode: Keyboard.KeyboardInputMode | null | undefined;
    /** Internal reference to the attribute "data-tchmi-text-horizontal-alignment */
    protected __valueHorizontalAlignment: HorizontalAlignment | null | undefined;
    /** Internal reference to the attribute "data-tchmi-content-padding" */
    protected __contentPadding: FourSidedCss | null | undefined;
    /** Internal reference to the attribute "data-tchmi-text-font-size" */
    protected __valueFontSize: number | undefined;
    /** Internal reference to the attribute "data-tchmi-text-font-size-unit" */
    protected __valueFontSizeUnit: FontSizeUnit | undefined;
    /** Internal reference to the attribute "data-tchmi-text-font-family" */
    protected __valueFontFamily: FontFamily | null | undefined;
    /** Internal reference to the attribute "data-tchmi-text-font-style" */
    protected __valueFontStyle: FontStyle | undefined;
    /** Internal reference to the attribute "data-tchmi-text-font-style" */
    protected __valueFontWeight: FontWeight | undefined;
    /** Internal reference to the attribute "data-tchmi-placeholder" */
    protected __placeholder: string | null | undefined;
    /** Internal reference to the attribute "data-tchmi-zero-padding" */
    protected __zeroPadding: number | null | undefined;
    /** Internal reference to the attribute "data-tchmi-text-color" */
    protected __valueColor: SolidColor | null | undefined;
    /** Internal reference to the attribute "data-tchmi-auto-focus-out" */
    protected __autoFocusOut: boolean | undefined;
    /** Internal reference to the attribute "data-tchmi-auto-select-text" */
    protected __autoSelectText: boolean | undefined;
    /** Internal reference to the attribute 'data-tchmi-ignore-invalid-values' */
    protected __ignoreInvalidValues: boolean | undefined;
    /** Internal reference to the attribute "data-tchmi-reset-to-last-valid-value" */
    protected __resetToLastValidValue: boolean | undefined;
    /** Internal reference to the attribute "data-tchmi-is-valid" */
    protected __isValid: boolean | undefined;
    protected __valueBuffer: ValueBuffer<number | bigint | null> | undefined;
    /** Injected TcHmi.Symbol for the Value attribute, or null when Value is not symbol-bound. */
    protected __valueSymbol: Symbol<number | bigint> | null;
    protected __destroyValueSymbolWatch: DestroyFunction | null;
    /** Injected TcHmi.Symbol for the MinValue attribute, or null when not symbol-bound. */
    protected __minValueSymbol: Symbol<number | bigint> | null;
    protected __destroyMinValueSymbolWatch: DestroyFunction | null;
    /** Injected TcHmi.Symbol for the MaxValue attribute, or null when not symbol-bound. */
    protected __maxValueSymbol: Symbol<number | bigint> | null;
    protected __destroyMaxValueSymbolWatch: DestroyFunction | null;
    /**
     * True while a value/min/max change is being applied from a symbol watch tick. Used to suppress writing the
     * value straight back to the symbol (which would echo the value we just received).
     */
    protected __applyingSymbolTick: boolean;
    /**
     * Attributes whose injected symbol last delivered a value successfully. Only those are written back, so the
     * symbol is never overwritten with a value that was never reconciled with it. An attribute is removed again
     * when its symbol reports an error or when the reference is handed over or released, and it is restored by
     * the next delivered value. Mirrors a classic Binding, which writes back only in state Ready and not while
     * its watch is in error.
     */
    protected __symbolRead: Set<"MaxValue" | "MinValue" | "Value">;
    /**
     * Synchronization gate: a bound Min/Max boundary is only "ready" once its symbol delivered its first watch
     * tick. A value received while a bound boundary is not ready is held in __pendingValue and applied once both
     * boundaries are ready, so it is never clamped against a boundary that a symbol is about to provide.
     *
     * Default true so default/static values are processed normally before we know whether the boundary is symbol
     * bound. __init forces this to false when the boundary is symbol bound (see {@link __init}); it is set back to true
     * once the boundary symbol delivers its first value (or fails).
     */
    protected __minValueReady: boolean;
    protected __maxValueReady: boolean;
    protected __pendingValue: {
        has: boolean;
        value: number | bigint | null | undefined;
    };
    /**
     * Last value of the injected Value symbol, received from it or written to it. undefined once a user or code
     * value replaced it.
     * Value, MinValue and MaxValue arrive independently. When Value arrives first, a later boundary change can
     * fall back to an outdated last valid value, and as the symbol does not change again the control would keep
     * showing that wrong value. So a boundary change validates this value again, see __processMinMaxValue.
     */
    protected __lastSymbolValue: number | bigint | null | undefined;
    /** Number formatter */
    protected __numberFormatter: Intl.NumberFormat;
    /** Internal reference to the attribute 'data-tchmi-unit-position' */
    protected __unitPosition: UnitPosition | undefined;
    /** Internal reference to the attribute 'data-tchmi-decimal-precision-mode' */
    protected __decimalPrecisionMode: DecimalPrecisionMode | undefined;
    /**
     * ReadOnly state of the control.
     */
    protected __isReadOnly: boolean | undefined;
    /** Interaction has started so we should raise event after it. */
    protected __triggerUIFinishedOnBlur: boolean;
    /** The internal min value */
    protected __internalMinValue: number | bigint | null;
    /** The internal max value */
    protected __internalMaxValue: number | bigint | null;
    /** Localization */
    protected __localizedInput: {
        key: string;
        parameters: any[];
    };
    protected __localizationReader: Locale.LocalizationReader | undefined;
    protected __resizeObserver: ResizeObserver;
    /**
     * If raised, the control object exists in control cache and constructor of each inheritation level was called.
     * This function is only to be used by the System. Other function calls are not intended.
     */
    __previnit(): void;
    /**
     * Pointer gesture arbitration: the value field is an editable text input. Take ownership of a left-button drag
     * that starts on it so the user can select its text with the mouse instead of an enclosing zoom/pan region taking
     * the drag over as a pan. A deactivated control disables the input element, so text cannot be selected and the
     * drag is left to the region. Read only is not checked as the text of a read only input is still selectable.
     * @param event The pointerdown event.
     */
    protected __ownsPointerDrag(event: PointerEvent): boolean;
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
     * Callback function of the resize observer
     */
    protected __onResize(): void;
    /**
     * Reads the current value from input element and calls __setValue with the result.
     */
    protected __setValueFromInput(): void;
    /**
     * Validates the value of the html input element. Input can ba a number or ''.
     * Higlights the controls if value is out of range.
     */
    protected __validateInput(): void;
    /**
     * Sets the internalMinValue and internalMaxValue and checks if the current value is in the range.
     * Switches min and max value if minValue is bigger than maxValue.
     */
    protected __setInternalMinMaxValues(): void;
    /**
     * Handle submit on keydown
     */
    protected __onKeydown(event: KeyboardEvent): void;
    /**
     * Store current selection before modification.
     */
    protected __onBeforeInput(event: InputEvent): void;
    /**
     * Handle value change on "input" to support virtual keyboards on mobile devices
     * which caches the value while editing (iOS for example)
     * input is fired when the keys has changed text
     */
    protected __onInput(event: InputEvent): void;
    /**
     * Is raised if text is pasted into the underlying textarea element.
     */
    protected __onPaste(event: Event): void;
    /**
     * Is raised if text is cut from the underlying textarea element.
     */
    protected __onCut(event: Event): void;
    /**
     * Is raised if the underlying input element gets the focus.
     */
    protected __onFocusIn(event: FocusEvent): void;
    /**
     * Is raised if the underlying input element has lost its focus.
     */
    protected __onFocusOut(event: FocusEvent): void;
    /**
     * Performs the steps after a focusout event was received.
     * @param event The focusout event.
     */
    protected __performFocusOut(event: Event): void;
    /**
     * Is raised after successful interaction with a TcHmiKeyboard control with indirect input.
     * @param event
     */
    protected __onIndirectInputFinished(event: Event): void;
    /**
     * Is raised after canceled interaction with a TcHmiKeyboard control with indirect input.
     * @param event
     */
    protected __onIndirectInputCanceled(event: Event): void;
    /**
     * Change the localization of the input elements validity
     * @param key The localization key.
     * @param parameters Optional parameters to pass to tchmi_format_string.
     */
    __setLocalizedInputValidity(key: string, ...parameters: any[]): void;
    /**
     * Process the value currently held in the input element of the control
     */
    protected __processCurrentValue(): void;
    /**
     * Sets the value of the member variable "valueType" if the new value is not equal to the current value.
     * @param valueNew The new value for value.
     */
    setValueType(valueNew: 'Number' | 'BigInt64' | 'UnsignedBigInt64' | null): void;
    /**
     * Processes the current value of valueType by calling all setter functions related to valueType.
     */
    protected __processValueType(): void;
    /**
     * Returns the current value of the member variable "valueType".
     * @returns The current value of the member variable "valueType".
     */
    getValueType(): "BigInt64" | "Number" | "UnsignedBigInt64" | undefined;
    /**
     * Sets the value of the member variable "value" if the new value is not equal to the current value
     * or the current control instance is locked and calls the associated process function (processValue) after that.
     * @param valueNew The new value for value.
     */
    setValue(valueNew: number | bigint | null): void;
    /**
     * Forgets the last symbol value when a value from another source replaces it, so a boundary change does not
     * restore the symbol value over it. A TwoWay write remembers the new value again.
     * @param value The value which is applied.
     */
    protected __releaseLastSymbolValue(value: number | bigint | null | undefined): void;
    /**
     * Sets the value of the member variable "value" regardless of lock.
     * @param valueNew The new value for value
     */
    protected __setValue(valueNew: number | bigint | null | undefined, options?: {
        process?: boolean;
        fromInput?: boolean;
    }): void;
    /**
     * Returns the last valid value.
     * @returns the last valid value.
     */
    getValue<T extends number | bigint = number>(): T | null | undefined;
    /**
     * Processes the current value of value and forwards it to the value attribute of the underlying input variable.
     * The current value of value is only forwarded if it is no binding expression.
     */
    protected __processValue(fromInput?: boolean): void;
    /**
     * Formats a value due to the current decimal digit, zero padding configuration.
     * @param value
     */
    protected __formatValue(value: number | bigint | null | undefined): string;
    /**
     * Floor a numeric value to specific decimal digits
     */
    protected __floorToDecimals(value: number | bigint): string;
    /**
     * Ceil a numeric value to specific decimal digits
     */
    protected __ceilToDecimals(value: number | bigint): string;
    /**
     * Sets the value of the member variable "minValue".
     * @param valueNew The new value for minValue
     */
    setMinValue(valueNew: number | bigint | null | undefined): void;
    /**
     * Returns the current value of the member variable minValue.
     * @returns the current value of the member variable minValue.
     */
    getMinValue<T extends number | bigint = number>(): T | null | undefined;
    /**
     * Processes the current minValue
     */
    protected __processMinMaxValue(): void;
    /**
     * Sets the value of the member variable "maxValue".
     * @param valueNew The new value for maxValue
     */
    setMaxValue(valueNew: number | bigint | null | undefined): void;
    /**
     * Returns the current value of the member variable maxValue.
     * @returns the current value of the member variable maxValue.
     */
    getMaxValue<T extends number | bigint = number>(): T | null | undefined;
    /**
     * Takes ownership of the TcHmi.Symbol handed over for an attribute and starts watching it (or delegates the
     * initial read to the preloading phase when the control is not attached yet). See __watchOrPreloadSymbol.
     * @param prop The attribute.
     * @param symbol The handed over symbol.
     */
    protected __injectSymbol(prop: 'Value' | 'MinValue' | 'MaxValue', symbol: Symbol<number | bigint>): void;
    /**
     * Returns the injected symbol for an attribute, or null when the attribute is not symbol-bound.
     * @param prop The attribute.
     */
    protected __symbolForProp(prop: 'Value' | 'MinValue' | 'MaxValue'): Symbol<number | bigint> | null;
    /**
     * Watches the injected symbol of an attribute when the control is attached; otherwise defers the initial read
     * to the framework preloading phase via the symbol's reference delegation. The value watch itself is
     * (re)established from __attach, mirroring the StateSymbol handling of TcHmiButton. The watch must not be set
     * up before the control is attached: with allowEarlySymbolReferenceInjection the reference is handed over
     * before it is resolved, so a watch created at injection time would not subscribe.
     * @param prop The attribute.
     */
    protected __watchOrPreloadSymbol(prop: 'Value' | 'MinValue' | 'MaxValue'): void;
    /**
     * (Re)establishes the value watch for an attribute's injected symbol and stores its destroy handle.
     * @param prop The attribute.
     * @param symbol The injected symbol.
     */
    protected __setSymbolWatch(prop: 'Value' | 'MinValue' | 'MaxValue', symbol: Symbol<number | bigint>): void;
    /**
     * Applies a value delivered by an injected symbol (from a watch tick or the preload read) through the normal
     * setter, suppressing the write-back to the symbol. Marks the boundary ready for MinValue / MaxValue.
     * @param prop The attribute.
     * @param data The symbol read/watch result.
     */
    protected __applySymbolValue(prop: 'Value' | 'MinValue' | 'MaxValue', data: Symbol.IReadResultObject<number | bigint>): void;
    /**
     * Ensures the injected symbol of an attribute is being watched. Called from __attach so a symbol injected
     * before attach (allowEarlySymbolReferenceInjection) is watched once the control enters the DOM.
     * @param prop The attribute.
     */
    protected __ensureSymbolWatch(prop: 'Value' | 'MinValue' | 'MaxValue'): void;
    /**
     * Destroys the value watch of an attribute's injected symbol (without releasing the symbol itself). Called
     * from __detach.
     * @param prop The attribute.
     */
    protected __unwatchSymbol(prop: 'Value' | 'MinValue' | 'MaxValue'): void;
    /**
     * Applies a value that was deferred until the bound boundaries delivered their first value. Does nothing
     * while a bound boundary is still pending or when no value was deferred.
     */
    protected __applyPendingValue(): void;
    /**
     * Writes a value back to the injected symbol of an attribute, but only when the attribute is symbol-bound
     * with BindingMode TwoWay.
     * @param prop The attribute.
     * @param symbol The injected symbol (or null when not bound).
     * @param value The value to write.
     */
    protected __writeToBoundSymbol(prop: 'Value' | 'MinValue' | 'MaxValue', symbol: Symbol<number | bigint> | null, value: number | bigint | null | undefined): void;
    /**
     * @param prop The attribute.
     * @returns true if a Binding exists for the attribute and its resolved BindingMode is TwoWay.
     */
    protected __isBindingTwoWay(prop: string): boolean;
    /**
     * Handles the symbol reference channel of a bindableAsRef attribute. Takes ownership of a handed over symbol,
     * replaces an already owned one and, when the symbol is null, releases it and reverts the attribute to its
     * configured default.
     * @param data Event data containing the affected propertyName and the symbol reference, or null on release.
     */
    protected __onAttributeSymbolReferenceChanged(data: {
        propertyName?: string;
        symbol?: Symbol<number | bigint> | null;
    } | undefined): void;
    /**
     * Stops watching and destroys the symbol owned for an attribute, if any.
     * @param prop The attribute.
     */
    protected __releaseSymbol(prop: 'Value' | 'MinValue' | 'MaxValue'): void;
    /**
     * Sets the value of the member variable decimalDigits.
     * @param valueNew The new value for decimalDigits
     */
    setDecimalDigits(valueNew: number | null): void;
    /**
     * Returns the current value of the member variable decimalDigits.
     * @returns the current value of the member variable decimalDigits.
     */
    getDecimalDigits(): number | null | undefined;
    /**
     * Processes the current value of decimalDigits and .
     */
    protected __processDecimalDigits(): void;
    /**
     * Updates the NumberFormat object that formats the numeric value to the displayed string due to the current zeroPadding, decimalDigits and decimalPrecisionMode.
     */
    protected __updateFormatter(): void;
    /**
     * Sets the decimalPrecisionMode attribute.
     * @param valueNew The new value for decimalPrecisionMode.
     */
    setDecimalPrecisionMode(valueNew: DecimalPrecisionMode | null): void;
    /**
     * Returns the current value of decimalPrecisionMode.
     */
    getDecimalPrecisionMode(): DecimalPrecisionMode | undefined;
    /**
     * Processes the current value of attribute decimalPrecisionMode.
     */
    protected __processDecimalPrecisionMode(): void;
    /**
     * Sets the unit value and calls the associated process function (processUnit).
     * @param valueNew The new value for unit.
     */
    setUnit(valueNew: string | null): void;
    /**
     * Returns the current value of unit.
     * @returns The current value of unit.
     */
    getUnit(): string | null | undefined;
    /**
     * Processes the current unit attribute value.
     */
    protected __processUnit(): void;
    /**
     * Sets the unitPosition attribute.
     * @param valueNew The new value for unitPosition.
     */
    setUnitPosition(valueNew: UnitPosition | null): void;
    /**
     * Returns the current value of unitPosition.
     */
    getUnitPosition(): UnitPosition | undefined;
    /**
     * Processes the current value of attribute unitPosition.
     */
    protected __processUnitPosition(): void;
    /**
     * Sets the value of the member variable SystemKeyboardInputMode.
     * @param valueNew The new value for SystemKeyboardInputMode.
     */
    setSystemKeyboardInputMode(valueNew: Keyboard.KeyboardInputMode | null): void;
    /**
     * Returns the current value of the member variable text.
     * @returns the current value of the member variable text.
     */
    getSystemKeyboardInputMode(): string | null | undefined;
    protected __processSystemKeyboardInputMode(): void;
    /**
     * Sets the text horizontal alignment and calls the associated process function (processValueHorizontalAlignment).
     * @param valueNew The new value for textHorizontalAlignment.
     */
    setValueHorizontalAlignment(valueNew: HorizontalAlignment | null): void;
    /**
     * Returns the current value of textHorizontalAlignment.
     * @returns The current value of textHorizontalAlignment.
     */
    getValueHorizontalAlignment(): HorizontalAlignment | null | undefined;
    /**
     * Processes the current textHorizontalAlignment attribute value.
     */
    protected __processValueHorizontalAlignment(): void;
    /**
     * Sets the contentPadding value and calls the associated process function (processContentPadding) after it.
     * @param valueNew The new value for the contentPadding attribute as object.
     */
    setContentPadding(valueNew: FourSidedCss | null, options?: AttributeSetterOptions): void;
    /**
     * The watch callback for the contentPadding object resolver.
     */
    protected __onResolverForContentPaddingWatchCallback(data: ObjectResolver.IWatchResultObject<FourSidedCss | null>): void;
    /**
     * Returns the current contentPadding value.
     * @returns The current value of the contentPadding member variable as json in string format.
     */
    getContentPadding(): FourSidedCss | null | undefined;
    /**
     * Processes the current contentPadding attribute.
     */
    protected __processContentPadding(): void;
    /**
     * Sets the font size and calls the associated process function (processValueFontSize).
     * @param valueNew The new value for textFontSize.
     */
    setValueFontSize(valueNew: number | null): void;
    /**
     * Returns the current value of textFontSize.
     * @returns The current value of textFontSize.
     */
    getValueFontSize(): number | undefined;
    /**
     * Processes the current textFontSize attribute value.
     */
    protected __processValueFontSize(): void;
    /**
     * Sets the font size and calls the associated process function (processValueFontSizeUnit).
     * @param valueNew The new value for textFontSize.
     */
    setValueFontSizeUnit(valueNew: FontSizeUnit | null): void;
    /**
     * Returns the current value of textFontSizeUnit.
     * @returns The current value of textFontSizeUnit.
     */
    getValueFontSizeUnit(): FontSizeUnit | undefined;
    /**
     * Processes the current textFontSizeUnit attribute value.
     */
    protected __processValueFontSizeUnit(): void;
    /**
     * Sets the font family and calls the associated process function (processValueFontFamily).
     * @param valueNew The new value for textFontFamily.
     */
    setValueFontFamily(valueNew: FontFamily | null): void;
    /**
     * Returns the current value of textFontFamily.
     * @returns The current value of textFontFamily.
     */
    getValueFontFamily(): string | null | undefined;
    /**
     * Processes the current textFontFamily attribute value.
     */
    protected __processValueFontFamily(): void;
    /**
     * Sets the font style and calls the associated process function (processValueFontStyle).
     * @param valueNew The new value for textFontStyle.
     */
    setValueFontStyle(valueNew: FontStyle | null): void;
    /**
     * Returns the current value of textFontStyle.
     * @returns The current value of textFontStyle.
     */
    getValueFontStyle(): FontStyle | undefined;
    /**
     * Processes the current textFontStyle attribute value.
     */
    protected __processValueFontStyle(): void;
    /**
     * Sets the font weight and calls the associated process function (processValueFontWeight).
     * @param valueNew The new value for textFontWeight.
     */
    setValueFontWeight(valueNew: FontWeight | null): void;
    /**
     * Returns the current value of textFontWeight.
     * @returns The current value of textFontWeight.
     */
    getValueFontWeight(): FontWeight | undefined;
    /**
     * Processes the current textFontWeight attribute value.
     */
    protected __processValueFontWeight(): void;
    /**
     * Sets the placeholder value and calls the associated process function (processPlaceholder).
     * @param valueNew The new value for placeholder.
     */
    setPlaceholder(valueNew: string | null): void;
    /**
     * Returns the current value of placeholder.
     * @returns The current value of placeholder.
     */
    getPlaceholder(): string | null | undefined;
    /**
     * Processes the current placeholder attribute value.
     */
    protected __processPlaceholder(): void;
    /**
     * Sets the value of the member variable "ZeroPadding".
     * @param valueNew The new value for ZeroPadding
     */
    setZeroPadding(valueNew: number | null | undefined): void;
    /**
     * Returns the current value of the member variable ZeroPadding.
     * @returns the current value of the member variable ZeroPadding.
     */
    getZeroPadding(): number | null | undefined;
    /**
     * Processes the current ZeroPadding
     */
    protected __processZeroPadding(): void;
    /**
     * Sets the text color and calls the associated process function (processValueColor).
     * @param valueNew The new value for textColor.
     */
    setValueColor(valueNew: SolidColor | null, options?: AttributeSetterOptions): void;
    /**
     * The watch callback for the textColor object resolver.
     */
    protected __onResolverForValueColorWatchCallback(data: ObjectResolver.IWatchResultObject<SolidColor>): void;
    /**
     * Returns the current value of textColor.
     * @returns The current value of textColor.
     */
    getValueColor(): SolidColor | null | undefined;
    /**
     * Processes the current textColor attribute value.
     */
    protected __processValueColor(): void;
    /**
     * Sets the auto focus out attribute and calls the associated process function (processAutoFocusOut).
     * @param valueNew The new value for autoFocusOut.
     */
    setAutoFocusOut(valueNew: boolean | null): void;
    /**
     * Returns the current value of autoFocusOut.
     * @returns The current value of autoFocusOut.
     */
    getAutoFocusOut(): boolean | undefined;
    /**
     * Processes the current autoFocusOut attribute value.
     */
    protected __processAutoFocusOut(): void;
    /** Lock handling */
    /**
     * Lock the control. Calls to setValue will be ignored until control is unlocked.
     */
    __lock(): void;
    /**
     * Unlocks the control.
     */
    __unlock(): void;
    /**
     * Returns true when the value lies within the current boundaries. null counts as in range.
     * @param value The value to check.
     */
    protected __isInRange(value: number | bigint | null): boolean;
    /**
     * Returns true while the user changes the value and the input holds a value which is not committed yet.
     */
    protected __isUserEditing(): boolean;
    /**
     * Checks if the Control is deactivated and adjusts the visualization
     */
    protected __processControlActivation(): void;
    /**
     * Processes the current isEnabled attribute value.
     */
    __processIsEnabled(): void;
    /**
     * Processes the current AccessConfig attribute value.
     */
    __processAccessConfig(): void;
    /**
     * Sets the isReadOnly attribute and calls the associated process function (processIsReadOnly).
     * @preserve (Part of the public API)
     */
    setIsReadOnly(valueNew: boolean | null): void;
    /**
     * Returns the effective value of isReadOnly based on own and parent isReadOnly variable.
     */
    getIsReadOnly(): boolean | undefined;
    /**
     * Process IsReadOnly.
     */
    protected __processIsReadOnly(): void;
    /**
     * Sets the auto select text attribute and calls the associated process function (processAutoSelectText).
     * @param valueNew The new value for autoSelectText.
     */
    setAutoSelectText(valueNew: boolean | null): void;
    /**
     * Returns the current value of autoSelectText.
     * @returns The current value of autoSelectText.
     */
    getAutoSelectText(): boolean | undefined;
    /**
     * Sets the resetToLastValidValue attribute.
     * @param valueNew The new value for resetToLastValidValue.
     */
    setResetToLastValidValue(valueNew: boolean | null): void;
    /**
     * Returns the current value of resetToLastValidValue.
     * @returns The current value of resetToLastValidValue.
     */
    getResetToLastValidValue(): boolean | undefined;
    /**
     * Processes the current ResetToLastValidValue attribute value.
     */
    __processResetToLastValidValue(): void;
    /**
     * Sets the inputProcessingPoint attribute.
     * @param valueNew The new value for inputProcessingPoint.
     */
    setInputProcessingPoint(valueNew: InputProcessingPoint | keyof typeof InputProcessingPoint | null): void;
    /**
     * Returns the current value of inputProcessingPoint.
     * @returns The current value of inputProcessingPoint.
     */
    getInputProcessingPoint(): InputProcessingPoint | undefined;
    /**
     * Processes the current InputProcessingPoint attribute value.
     */
    __processInputProcessingPoint(): void;
    /**
     * Sets the ignoreInvalidValues attribute.
     * @param valueNew The new value for ignoreInvalidValues.
     */
    setIgnoreInvalidValues(valueNew: boolean | null): void;
    /**
     * Returns the current value of ignoreInvalidValues.
     * @returns The current value of ignoreInvalidValues.
     */
    getIgnoreInvalidValues(): boolean | undefined;
    /**
     * Processes the current value of attribute ignoreInvalidValues.
     */
    protected __processIgnoreInvalidValues(): void;
    /**
     * Sets the focus to the html input element.
     */
    focus(): void;
    /**
     * Sets the value of isValid.
     */
    protected __setIsValid(newValue: boolean): void;
    /**
     * Returns the current value of isValid.
     * @returns The current value of isValid.
     */
    getIsValid(): boolean | undefined;
}
export type UnitPosition = 'Left' | 'Right';
export type DecimalPrecisionMode = 'Truncate' | 'Round';
export { TcHmiNumericInput as Control };
declare const _TcHmiNumericInput: typeof TcHmiNumericInput;
type tTcHmiNumericInput = TcHmiNumericInput;
type tUnitPosition = UnitPosition;
type tDecimalPrecisionMode = DecimalPrecisionMode;
declare global {
    namespace TcHmi.Controls.Beckhoff {
        const TcHmiNumericInput: typeof _TcHmiNumericInput;
        type TcHmiNumericInput = tTcHmiNumericInput;
        namespace TcHmiNumericInput {
            type UnitPosition = tUnitPosition;
            type DecimalPrecisionMode = tDecimalPrecisionMode;
        }
    }
}
//# sourceMappingURL=TcHmiNumericInput.esm.d.ts.map