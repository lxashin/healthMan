import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { ref, watch, computed, defineComponent } from "vue";
import { pick, extend, createNamespace, makeNumericProp, isSameValue } from "../utils/index.mjs";
import { genOptions, sharedProps, pickerInheritKeys, formatValueRange } from "../date-picker/utils.mjs";
import { Picker } from "../picker/index.mjs";
const [name] = createNamespace("time-picker");
const timePickerProps = extend({}, sharedProps, {
  minHour: makeNumericProp(0),
  maxHour: makeNumericProp(23),
  minMinute: makeNumericProp(0),
  maxMinute: makeNumericProp(59),
  minSecond: makeNumericProp(0),
  maxSecond: makeNumericProp(59),
  columnsType: {
    type: Array,
    default: () => ["hour", "minute"]
  }
});
var stdin_default = defineComponent({
  name,
  props: timePickerProps,
  emits: ["confirm", "cancel", "change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const currentValues = ref(props.modelValue);
    const columns = computed(() => props.columnsType.map((type) => {
      const {
        filter,
        formatter
      } = props;
      switch (type) {
        case "hour":
          return genOptions(+props.minHour, +props.maxHour, type, formatter, filter);
        case "minute":
          return genOptions(+props.minMinute, +props.maxMinute, type, formatter, filter);
        case "second":
          return genOptions(+props.minSecond, +props.maxSecond, type, formatter, filter);
        default:
          if (process.env.NODE_ENV !== "production") {
            throw new Error(`[Vant] DatePicker: unsupported columns type: ${type}`);
          }
          return [];
      }
    }));
    watch(currentValues, (newValues) => {
      if (!isSameValue(newValues, props.modelValue)) {
        emit("update:modelValue", newValues);
      }
    });
    watch(() => props.modelValue, (newValues) => {
      newValues = formatValueRange(newValues, columns.value);
      if (!isSameValue(newValues, currentValues.value)) {
        currentValues.value = newValues;
      }
    }, {
      immediate: true
    });
    const onChange = (...args) => emit("change", ...args);
    const onCancel = (...args) => emit("cancel", ...args);
    const onConfirm = (...args) => emit("confirm", ...args);
    return () => _createVNode(Picker, _mergeProps({
      "modelValue": currentValues.value,
      "onUpdate:modelValue": ($event) => currentValues.value = $event,
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, pick(props, pickerInheritKeys)), slots);
  }
});
export {
  stdin_default as default,
  timePickerProps
};
