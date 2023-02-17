import { type ExtractPropTypes } from 'vue';
import { AddressListAddress } from './AddressListItem';
export declare const addressListProps: {
    list: {
        type: import("vue").PropType<AddressListAddress[]>;
        default: () => never[];
    };
    modelValue: (NumberConstructor | StringConstructor)[];
    switchable: {
        type: BooleanConstructor;
        default: true;
    };
    disabledText: StringConstructor;
    disabledList: {
        type: import("vue").PropType<AddressListAddress[]>;
        default: () => never[];
    };
    addButtonText: StringConstructor;
    defaultTagText: StringConstructor;
};
export type AddressListProps = ExtractPropTypes<typeof addressListProps>;
declare const _default: import("vue").DefineComponent<{
    list: {
        type: import("vue").PropType<AddressListAddress[]>;
        default: () => never[];
    };
    modelValue: (NumberConstructor | StringConstructor)[];
    switchable: {
        type: BooleanConstructor;
        default: true;
    };
    disabledText: StringConstructor;
    disabledList: {
        type: import("vue").PropType<AddressListAddress[]>;
        default: () => never[];
    };
    addButtonText: StringConstructor;
    defaultTagText: StringConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("select" | "update:modelValue" | "add" | "edit" | "clickItem" | "editDisabled" | "selectDisabled")[], "select" | "update:modelValue" | "add" | "edit" | "clickItem" | "editDisabled" | "selectDisabled", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    list: {
        type: import("vue").PropType<AddressListAddress[]>;
        default: () => never[];
    };
    modelValue: (NumberConstructor | StringConstructor)[];
    switchable: {
        type: BooleanConstructor;
        default: true;
    };
    disabledText: StringConstructor;
    disabledList: {
        type: import("vue").PropType<AddressListAddress[]>;
        default: () => never[];
    };
    addButtonText: StringConstructor;
    defaultTagText: StringConstructor;
}>> & {
    onSelect?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onEdit?: ((...args: any[]) => any) | undefined;
    onAdd?: ((...args: any[]) => any) | undefined;
    onClickItem?: ((...args: any[]) => any) | undefined;
    onEditDisabled?: ((...args: any[]) => any) | undefined;
    onSelectDisabled?: ((...args: any[]) => any) | undefined;
}, {
    switchable: boolean;
    list: AddressListAddress[];
    disabledList: AddressListAddress[];
}>;
export default _default;
