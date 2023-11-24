import { ClassValue, clsx } from "clsx"

const classesLookMap = Object.entries({
   ['__-display']: ['fw', 'fwr', 'fr', 'frc', 'frnc', 'frcc', 'frcb', 'frca', 'frce', 'fc', 'fcc', 'fcnc', 'fcnb', 'fcna', 'fcne', 'fccc', 'none', 'iblock', 'iflex', 'igrid', 'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'inline-grid', 'contents', 'list-item', 'hidden'],
   ['__-position']: ["pos-a", 'pos-r', 'pos-s', 'pos-f', 'static', 'fixed', 'absolute', 'relative', 'sticky'],
   ['__-overflow']: ['oh', 'ov', 'oa', 'oxh', 'oxv', 'oxa', 'oyh', 'oyv', 'oya'],
   ['__-object_fit']: ['cover', 'contain', 'fill'],
   ['__-text_transform']: ['tcap', 'tlower', 'tupper'],
   ['__-text_align']: ['tc', 'tj', 'ts', 'te', 'tl', 'tr']
})

const utilitiesToLookMap: Record<string, string> = {
   ["inline-"]: '__-display',
   ["table-"]: '__-display',
   ["flow-"]: '__-display',
   ["list-"]: '__-display',
   ["pos-"]: '__-position'
}

const microtailwindMerge = (className: string) => {
   const classes: Record<string, string> = {}
   for (const utilityOrClass of className.split(' ')) {
      if (!utilityOrClass) continue
      const index = utilityOrClass.indexOf('-')
      if (index === -1) {
         let existClass: string | boolean = false
         for (const [key, values] of classesLookMap) {
            if (values.includes(utilityOrClass)) {
               existClass = key
               break
            }
         }
         classes[existClass || utilityOrClass] = utilityOrClass
      } else {
         const utility = utilityOrClass.slice(0, index + 1)
         const isMixed: string | undefined = utilitiesToLookMap[utility]
         classes[isMixed || utility] = utilityOrClass
      }
   }
   const goodClasses = Object.values(classes).join(' ')
   return goodClasses
}

export const cn = (...classes: ClassValue[]) => microtailwindMerge(clsx(...classes))