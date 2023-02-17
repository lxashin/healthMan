var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default,
  timePickerProps: () => timePickerProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_utils2 = require("../date-picker/utils");
var import_picker = require("../picker");
const [name] = (0, import_utils.createNamespace)("time-picker");
const timePickerProps = (0, import_utils.extend)({}, import_utils2.sharedProps, {
  minHour: (0, import_utils.makeNumericProp)(0),
  maxHour: (0, import_utils.makeNumericProp)(23),
  minMinute: (0, import_utils.makeNumericProp)(0),
  maxMinute: (0, import_utils.makeNumericProp)(59),
  minSecond: (0, import_utils.makeNumericProp)(0),
  maxSecond: (0, import_utils.makeNumericProp)(59),
  columnsType: {
    type: Array,
    default: () => ["hour", "minute"]
  }
});
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: timePickerProps,
  emits: ["confirm", "cancel", "change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const currentValues = (0, import_vue2.ref)(props.modelValue);
    const columns = (0, import_vue2.computed)(() => props.columnsType.map((type) => {
      const {
        filter,
        formatter
      } = props;
      switch (type) {
        case "hour":
          return (0, import_utils2.genOptions)(+props.minHour, +props.maxHour, type, formatter, filter);
        case "minute":
          return (0, import_utils2.genOptions)(+props.minMinute, +props.maxMinute, type, formatter, filter);
        case "second":
          return (0, import_utils2.genOptions)(+props.minSecond, +props.maxSecond, type, formatter, filter);
        default:
          if (process.env.NODE_ENV !== "production") {
            throw new Error(`[Vant] DatePicker: unsupported columns type: ${type}`);
          }
          return [];
      }
    }));
    (0, import_vue2.watch)(currentValues, (newValues) => {
      if (!(0, import_utils.isSameValue)(newValues, props.modelValue)) {
        emit("update:modelValue", newValues);
      }
    });
    (0, import_vue2.watch)(() => props.modelValue, (newValues) => {
      newValues = (0, import_utils2.formatValueRange)(newValues, columns.value);
      if (!(0, import_utils.isSameValue)(newValues, currentValues.value)) {
        currentValues.value = newValues;
      }
    }, {
      immediate: true
    });
    const onChange = (...args) => emit("change", ...args);
    const onCancel = (...args) => emit("cancel", ...args);
    const onConfirm = (...args) => emit("confirm", ...args);
    return () => (0, import_vue.createVNode)(import_picker.Picker, (0, import_vue.mergeProps)({
      "modelValue": currentValues.value,
      "onUpdate:modelValue": ($event) => currentValues.value = $event,
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, (0, import_utils.pick)(props, import_utils2.pickerInheritKeys)), slots);
  }
});
