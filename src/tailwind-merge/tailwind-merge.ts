import { ClassValue, clsx } from "clsx"

/*
too hard to imlpement?
'border-*', 'outline-*', 'text-*', 'object-*', 'font-*', 'stroke-*'
*/

const classesLookMap = Object.entries({
   '__-display': [
      'fw', 'fwr', 'fr', 'frc', 'frnc', 'frcc', 'frcb', 'frca', 'frce', 'fc', 'fcc', 'fcnc', 'fcnb', 'fcna', 'fcne', 'fccc',
      'none', 'iblock', 'iflex', 'igrid',
      'block', 'inline-block', 'inline', 'flex', 'inline-flex',
      'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row-group', 'table-row',
      'flow-root', 'grid', 'inline-grid', 'contents', 'list-item', 'hidden'
   ],
   '__-position': ["pos-a", 'pos-r', 'pos-s', 'pos-f', 'static', 'fixed', 'absolute', 'relative', 'sticky'],
   '__-overflow': [
      'oh', 'ov', 'oa', 'oxh', 'oxv', 'oxa', 'oyh', 'oyv', 'oya',
      'overflow-auto', 'overflow-hidden', 'overflow-clip', 'overflow-visible', 'overflow-scroll',
      'overflow-x-auto', 'overflow-y-auto', 'overflow-x-hidden', 'overflow-y-hidden', 'overflow-x-clip', 'overflow-y-clip', 'overflow-x-visible', 'overflow-y-visible', 'overflow-x-scroll', 'overflow-y-scroll',
   ],
   '__-object_fit': ['cover', 'contain', 'fill'],
   '__-text_transform': ['tcap', 'tlower', 'tupper', 'uppercase', 'lowercase', 'capitalize', 'normal-case'],
   '__-text_align': [
      'tc', 'tj', 'ts', 'te', 'tl', 'tr',
      'text-center', 'text-justify', 'text-start', 'text-end', 'text-left', 'text-right',
   ]
})

const bgBlackList = Object.entries({
   "__bg-image": ['bg-none', 'bg-gradient-to-t', 'bg-gradient-to-tr', 'bg-gradient-to-r', 'bg-gradient-to-br', 'bg-gradient-to-b', 'bg-gradient-to-bl', 'bg-gradient-to-l', 'bg-gradient-to-tl'],
   "__bg-size": ['bg-auto', 'bg-cover', 'bg-contain'],
   "__bg-repeat": ['bg-repeat', 'bg-no-repeat', 'bg-repeat-x', 'bg-repeat-y', 'bg-repeat-round', 'bg-repeat-space'],
   "__bg-position": ['bg-bottom', 'bg-center', 'bg-left', 'bg-left-bottom', 'bg-left-top', 'bg-right', 'bg-right-bottom', 'bg-right-top', 'bg-top'],
   "__bg-origin": ['bg-origin-border', 'bg-origin-padding', 'bg-origin-content'],
   "__bg-clip": ['bg-clip-border', 'bg-clip-padding', 'bg-clip-content', 'bg-clip-text'],
   "__bg-attachment": ['bg-fixed', 'bg-local', 'bg-scroll'],
})

const _utilitiesList = [
   'aspect',
   'inset',
   'columns',
   'float',
   'clear',
   'scale-x', 'scale-y', 'scale',
   'rotate',
   'translate-x', 'translate-y',
   'skew-x', 'skew-y',
   'origin',
   'accent',
   'cursor',
   'caret',
   'pointer-events',
   'resize',
   'select',
   'fill',
   'shadow', 's', 'sc',
   'opacity', 'o',
   'bg-opacity', 'bgo',
   'bg',
   'gap-x', 'gx', 'gap-y', 'gy', 'gap', 'g',
   'max-w', 'max-h', 'min-w', 'min-h', 'w', 'h',
   'm', 'mx', 'my', 'ml', 'mr', 'mt', 'mb',
   'p', 'px', 'py', 'pl', 'pr', 'pt', 'pb',
   'z',
   'btr', 'rounded-t', 'brr', 'rounded-r', 'bbr', 'rounded-b', 'blr', 'rounded-l', 'btlr', 'btrr', 'bbrr', 'bblr', 'br', 'rounded',
   'bc', 'bxc', 'byc', 'btc', 'brc', 'bbc', 'blc',
   'bo',
   'bs', 'bxs', 'bys', 'bts', 'brs', 'bbs', 'bls',
   'bw', 'bxw', 'byw', 'btw', 'brw', 'bbw', 'blw',
   'os', 'oc', 'oo', 'ow',
   'tc', 'ts', 'to', 'tf', 'tw',
   'lh', 'ls',
   't', 'top', 'r', 'right', 'b', 'bottom', 'l', 'left'
]
const utilitiesList = _utilitiesList.map(utility => `${utility}-`)

const _mixedUtilities = {
   s: 'shadow',
   o: 'opacity',
   bgo: 'bg-opacity',
   g: 'gap',
   gx: 'gap-x',
   gy: 'gap-y',
   btr: 'rounded-t',
   brr: 'rounded-r',
   bbr: 'rounded-b',
   blr: 'rounded-l',
   br: 'rounded',
   t: 'top',
   r: 'right',
   b: 'bottom',
   l: 'left',
}
const mixedUtilities: Record<string, string> = {}
for (const [key, value] of Object.entries(_mixedUtilities)) {
   const valueWithDash = `${value}-`
   mixedUtilities[`${key}-`] = valueWithDash
   mixedUtilities[valueWithDash] = valueWithDash
}

const microtailwindMerge = (className: string) => {

   const classes: Record<string, string> = {}

   classesList: for (const utilityOrClass of className.split(' ')) {

      /* return if empty */
      if (!utilityOrClass) continue

      /* check if its class */
      for (const [key, values] of classesLookMap) {
         if (values.includes(utilityOrClass)) {
            classes[key] = utilityOrClass
            continue classesList
         }
      }

      /* check if its bg class */
      for (const [key, values] of bgBlackList) {
         if (values.includes(utilityOrClass)) {
            classes[key] = utilityOrClass
            continue classesList
         }
      }

      /*check if its utility */
      for (const utility of utilitiesList) {
         const includesUtilityIndex = utilityOrClass.indexOf(utility)

         if (includesUtilityIndex === -1) continue

         const isNegated = includesUtilityIndex > 0 && utilityOrClass.at(includesUtilityIndex - 1) === '-'

         if (includesUtilityIndex === 0 || (includesUtilityIndex === 1 && isNegated)) {
            const isMixed: string | undefined = mixedUtilities[utility]
            classes[isMixed || utility] = utilityOrClass
            continue classesList
         }

         const utilityWithModifiers = (includesUtilityIndex > 1) && (utilityOrClass.at(includesUtilityIndex - 1) === ':')
         const negatedUtilityWithModifiers = (includesUtilityIndex > 2) && isNegated && (utilityOrClass.at(includesUtilityIndex - 2) === ':')

         if (utilityWithModifiers || negatedUtilityWithModifiers) {
            const isMixed: string | undefined = mixedUtilities[utility]
            const fullUtility = utilityOrClass.slice(0, isNegated ? includesUtilityIndex - 1 : includesUtilityIndex) + (isMixed || utility)
            classes[fullUtility] = utilityOrClass
            continue classesList
         }
      }

      classes[utilityOrClass] = utilityOrClass
   }

   const goodClasses = Object.values(classes).join(' ')
   return goodClasses
}

export const cn = clsx
export const cnx = (...classes: ClassValue[]) => microtailwindMerge(cn(...classes))