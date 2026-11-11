export declare class PermissionCheckbox extends HTMLElement {
    constructor(para: {
        initValue?: boolean;
        changeCallback?: (...args: any[]) => void;
        unset?: boolean;
        colorCoded?: boolean;
        disabled?: boolean;
        readOnly?: boolean;
    });
    private __loading;
    private __checkboxContainer;
    private __checkbox;
    private __checkmark;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /** Keeps another click from changing the value while its write is pending. */
    private readonly __preventPendingClick;
    /** What the owner wants to be told, it survives a checkbox which is taken out of the dom and put back. */
    private __changeCallback;
    /** The listener which currently answers for it, only a checkbox in the dom has one. */
    private __changeListener;
    set changeCallback(fn: ((...args: any[]) => void) | undefined);
    /** Keeps the listener in step with the callback and with being part of the dom. */
    private __applyChangeCallback;
    /** The input itself, the control labels it and would otherwise look it up on every pass. */
    get input(): HTMLInputElement;
    get checked(): boolean;
    set checked(value: boolean);
    loading(): void;
    /**
     * Ends what loading() started. Without it the animation only disappears when the row is built again, so a
     * checkbox spins until the next value of the subscription arrives.
     */
    loaded(): void;
    private __readOnly;
    get readOnly(): boolean;
    set readOnly(value: boolean);
    private __colorCoded;
    get colorCoded(): boolean;
    set colorCoded(value: boolean);
    private __unset;
    /** An access which the symbols it stands for do not agree on. */
    get unset(): boolean;
    set unset(value: boolean);
    private __disabled;
    get disabled(): boolean;
    set disabled(value: boolean);
    /**
     * A checkbox which is disabled or read only must not be reachable, neither by the pointer through its
     * label nor by the keyboard. The attribute on the label only colours it, the input carries the guard.
     */
    private __applyInputGuard;
    get enabled(): boolean;
    set enabled(value: boolean);
}
//# sourceMappingURL=PermissionCheckbox.d.ts.map