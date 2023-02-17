import { type InjectionKey, type ExtractPropTypes } from 'vue';
export type PickerGroupProvide = Record<string, string>;
export declare const PICKER_GROUP_KEY: InjectionKey<PickerGroupProvide>;
export declare const pickerGroupProps: {
    tabs: {
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
    nextStepText: StringConstructor;
} & {
    title: StringConstructor;
    cancelButtonText: StringConstructor;
    confirmButtonText: StringConstructor;
};
export type PickerGroupProps = ExtractPropTypes<typeof pickerGroupProps>;
declare const _default: import("vue").DefineComponent<{
    tabs: {
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
    nextStepText: StringConstructor;
} & {
    title: StringConstructor;
    cancelButtonText: StringConstructor;
    confirmButtonText: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("cancel" | "confirm")[], "cancel" | "confirm", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
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
}>;
export default _default;
