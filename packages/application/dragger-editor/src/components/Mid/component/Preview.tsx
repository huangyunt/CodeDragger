import React, { CSSProperties, useRef, useState } from 'react'
import { useDrop } from 'react-dnd'
import { Layout, Responsive, WidthProvider } from 'react-grid-layout'
import DeleteIcon from './DeleteIcon'
// import RemoteComponent from '@cdl-pkg/remote-component'
import './Preview.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive)
export interface LayoutType extends Layout {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FC<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dProps: any
}
const style: CSSProperties = {
  width: '100%',
  height: '100%'
}
const Preview: React.FC = () => {
  const [layouts, setLayout] = useState<LayoutType[]>([])
  const index = useRef<number>(0)
  const [, drop] = useDrop(() => ({
    accept: 'Draggable-Component',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    drop: (item: { type: React.FC<any>; props: any }) => {
      setLayout((oldLayout) => [
        ...oldLayout,
        {
          i: '' + index.current++,
          x: 0,
          y: Infinity,
          w: 375,
          h: 100,
          component: item.type,
          dProps: item.props
        }
      ])
    }
  }))
  const removeItem = (key: string) => {
    setLayout((oldLayouts) => {
      const newLayouts = oldLayouts.filter((layout) => layout.i !== key)
      return [...newLayouts]
    })
  }
  const handleDoubleClick = (key: string) => {
    return () => {
      console.log(key)
    }
  }
  const handleLayoutChange = (layout: Layout[]) => {
    console.log(layout)
    // saveToLS('layout', layout)
  }

  return (
    <div style={style} ref={drop}>
      <ResponsiveReactGridLayout
        className='layout'
        rowHeight={1}
        margin={[0, 0]}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 375 }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        onLayoutChange={handleLayoutChange}
        droppingItem={{ i: new Date().getTime().toString(), w: 375, h: 100 }}
        isDroppable
        isBounded
      >
        {layouts.map((layout, ind) => {
          const FnComponent = layout.component
          return (
            <div
              key={layout.i}
              data-grid={layouts[ind]}
              onDoubleClick={handleDoubleClick(layout.i)}
            >
              <DeleteIcon componentKey={layout.i} onRemoveItem={removeItem} />
              <FnComponent style={style} {...layout.dProps} />
            </div>
          )
        })}
      </ResponsiveReactGridLayout>
    </div>
  )
}

export default Preview

// function getFromLS(key) {
//   let ls = {}
//   if (global.localStorage) {
//     try {
//       ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {}
//     } catch (e) {
//       /*Ignore*/
//     }
//   }
//   return ls[key]
// }

// function saveToLS(key: string, value: Object) {
//   window.localStorage.setItem(key, JSON.stringify(value))
// }
