// Compatibility file for non-module typescript compiles without adjustments.
// Use the following line for modern code (needs adjustments to tsconfig.json#configOptions/paths)
// import { TcHmiControl } from "Beckhoff.TwinCAT.HMI.Framework/index.esm.js";
// ***************************************************************************


declare class TcHmiPasswordInput extends TcHmi.Controls.Beckhoff.TcHmiInput {
    #private;
    /** Reference to the button which reveals the password as HTMLButtonElement object. */
    protected __elementRevealButton: HTMLButtonElement;
    /** Internal reference to the attribute "data-tchmi-password-reveal-mode" */
    protected __passwordRevealMode: PasswordRevealMode | undefined;
    /** True while the password is displayed as plain text. */
    protected __passwordRevealed: boolean;
    constructor(element: JQuery, pcElement: JQuery, attrs: Controls.ControlAttributeList);
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
     * Starts revealing the password while the button is held down.
     */
    protected __onRevealPointerDown(event: PointerEvent): void;
    /**
     * Starts revealing the password while space or enter is held down on the focused button.
     */
    protected __onRevealKeydown(event: KeyboardEvent): void;
    /**
     * Stops revealing the password once the button is no longer held down.
     */
    protected __onRevealRelease(): void;
    /**
     * Suppresses the context menu which a long press on touch devices would open.
     */
    protected __onRevealContextMenu(event: MouseEvent): void;
    /**
     * Ignores the focus arriving from the reveal button, which belongs to the control and is not a focus entering it.
     * The decorator is repeated because it is applied per method and would not carry over to this override.
     */
    protected __onFocusIn(event: FocusEvent): void;
    /**
     * Masks the password again once the focus leaves the control, like the reveal button built into browsers.
     * Moving the focus between the input and the reveal button stays inside the control and is not a focus out.
     */
    protected __performFocusOut(event: Event): void;
    /**
     * Tells whether the focus only moves between the input and the reveal button, which both belong to this control.
     * relatedTarget is the element the focus moves to on focusout and the one it comes from on focusin.
     */
    protected __isInternalFocusMove(event: Event): boolean;
    /**
     * Switches the password display on each click.
     */
    protected __onRevealClick(): void;
    /**
     * Displays the password as plain text or as masked text.
     * @param revealed True to display the password as plain text.
     */
    protected __setPasswordRevealed(revealed: boolean): void;
    /**
     * Names the reveal button for screen readers and, in mode 'Toggle', reflects whether the password is shown.
     * In mode 'PressAndHold' the reveal ends with the press, so there is no state to expose and the label stays put.
     */
    protected __processRevealButtonLabel(): void;
    /**
     * Sets the value of passwordRevealMode and calls the associated process function after it.
     * @param valueNew The new value for passwordRevealMode.
     * Possible Values: Off, PressAndHold, Toggle
     */
    setPasswordRevealMode(valueNew: PasswordRevealMode | null): void;
    /**
     * Returns the current value of passwordRevealMode.
     * @returns The current value of passwordRevealMode.
     */
    getPasswordRevealMode(): PasswordRevealMode | undefined;
    /**
     * Processes the current passwordRevealMode attribute value.
     */
    protected __processPasswordRevealMode(): void;
    /**
     * Keeps the text clear of the reveal button. This cannot be done in the stylesheet because the base class writes
     * the content padding as an inline style, which would win over any rule.
     */
    protected __processContentPadding(): void;
    /**
     * Disables the reveal button and masks the password as soon as operating the control is no longer permitted,
     * because every handler behind the button is blocked in that state.
     */
    protected __processControlActivation(): void;
    /**
     * The base class writes the font size as an inline style on the input only, so it is mirrored onto the button to
     * keep the em based button width and the padding reserving its space on the same basis.
     */
    protected __processTextFontSize(): void;
    /**
     * See __processTextFontSize.
     */
    protected __processTextFontSizeUnit(): void;
}
export { TcHmiPasswordInput as Control };
type PasswordRevealMode = 'Off' | 'PressAndHold' | 'Toggle';
declare const _TcHmiPasswordInput: typeof TcHmiPasswordInput;
type tTcHmiPasswordInput = TcHmiPasswordInput;
declare global {
    namespace TcHmi.Controls.Beckhoff {
        const TcHmiPasswordInput: typeof _TcHmiPasswordInput;
        type TcHmiPasswordInput = tTcHmiPasswordInput;
    }
}
