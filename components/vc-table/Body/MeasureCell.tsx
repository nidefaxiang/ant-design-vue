import { defineComponent, onMounted, ref } from 'vue';
import VCResizeObserver from '../../vc-resize-observer';
import type { Key } from '../interface';

export interface MeasureCellProps {
  columns: any;
  columnKey: Key;
  onColumnResize: (key: Key, width: number) => void;
}

export default defineComponent<MeasureCellProps>({
  name: 'MeasureCell',
  props: ['columnKey', 'columns'] as any,
  setup(props, { emit }) {
    const tdRef = ref<HTMLTableCellElement>();
    onMounted(() => {
      if (tdRef.value) {
        emit('columnResize', props.columnKey, tdRef.value.offsetWidth);
      }
    });
    return () => {
      const filter = props.columns.find((item: any) => item.key === props.columnKey);
      const tdText = filter ? filter.title : '&nbsp;';
      return (
        <VCResizeObserver
          onResize={({ offsetWidth }) => {
            emit('columnResize', props.columnKey, offsetWidth);
          }}
        >
          <td ref={tdRef} style={{ paddingTop: 0, paddingBottom: 0, border: 0, height: 0 }}>
            <div style={{ height: 0, overflow: 'hidden' }}>{tdText}</div>
          </td>
        </VCResizeObserver>
      );
    };
  },
});
