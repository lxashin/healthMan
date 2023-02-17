import { PickerGroupProps } from './PickerGroup';
export declare const PickerGroup: import("../utils").WithInstall<import("vue").DefineComponent<{
    tabs: {
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
    nextStepText: StringConstructor;
} & {
    title: StringConstructor;
    cancelButtonText: StringConstructor;
    confirmButtonText: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("cancel" | "confirm")[], "cancel" | "confirm", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    tabs: {
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
    nextStepText: StringConstructor;
} & {
    title: StringConstructor;
    cancelButtonText: StringConstructor;
    confirmButtonText: StringConstructor;
}>> & {
    onCancel?: ((...args: any[]) => any) | undefined;
    onConfirm?: ((...args: any[]) => any) | undefined;
}, {
    tabs: string[];
}>>;
export default PickerGroup;
export { pickerGroupProps } from './PickerGroup';
export type { PickerGroupProps };
export type { PickerGroupThemeVars } from './types';
declare module 'vue' {
    interface GlobalComponents {
        VanPickerGroup: typeof PickerGroup;
    }
}
