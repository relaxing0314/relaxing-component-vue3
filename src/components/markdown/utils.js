// 处理容器内链接，添加target="_blank"属性
export function beautifyA(ele) {
  const links = ele.querySelectorAll('a')
  links.forEach((link) => {
    // 如果是页面内锚点链接，不添加target属性，并设置点击事件
    if (link.getAttribute('href')?.startsWith('#')) {
      link.removeAttribute('target')
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const targetId = link.getAttribute('href')?.substring(1)
        if (targetId && ele) {
          const targetElement = ele.querySelector(`#${targetId}`)
          if (targetElement)
            targetElement.scrollIntoView({ behavior: 'smooth' })
        }
      })
    }
    else {
      // 如果链接是图片链接的，渲染图片
      const href = link.getAttribute('href') || ''
      const isImageLink = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(href)
      if (isImageLink && !link.querySelector('img')) {
        // 如果是图片链接且链接内没有img标签，创建img
        const img = document.createElement('img')
        img.src = href
        img.alt = link.textContent || '图片'
        img.className = 'link-image'
        const titEle = document.createElement('div')
        titEle.setAttribute('title', link.textContent)
        titEle.className = 'link-image-title'
        titEle.textContent = link.textContent
        const boxEle = document.createElement('div')
        boxEle.className = 'link-image-box'
        boxEle.appendChild(titEle)
        boxEle.appendChild(img)
        // 清空链接内容并添加图片
        link.textContent = ''
        link.style.cssText = 'text-decoration: none;'
        link.appendChild(boxEle)
      }
      link.setAttribute('target', '_blank')
      link.setAttribute('rel', 'noopener noreferrer')
    }
  })
}
/**
 * 针对图片列表美化
 * 为满足条件的ul和li标签添加class属性
 * @param {string} ulClass 要添加给ul标签的class名
 * @param {string} liClass 要添加给li标签的class名
 */
export function addClassToImageList(ele, ulClass = 'image-list', liClass = 'image-item') {
  // 获取指定元素中所有的ul标签
  const ulElements = ele.querySelectorAll('ul')

  ulElements.forEach((ul) => {
    const liElements = ul.querySelectorAll('li')
    let allMatch = true

    // 检查是否所有li都只有一个a标签子元素，且a标签内是图片
    if (liElements.length > 0) {
      for (const li of liElements) {
        // 检查li是否只有一个a标签作为子元素
        const aElements = li.querySelectorAll('a')
        if (aElements.length !== 1) {
          allMatch = false
          break
        }

        const aElement = aElements[0]
        // 检查a标签内是否只包含一个img元素
        const imgElements = aElement.querySelectorAll('img')
        if (imgElements.length !== 1 || aElement.childElementCount !== 1) {
          allMatch = false
          break
        }
      }

      // 如果所有li都满足条件，为ul和所有li添加class
      if (allMatch) {
        ul.classList.add(ulClass)
        liElements.forEach((li) => {
          li.classList.add(liClass)
        })
      }
    }
  })
}

// 为表格添加响应式包装
export function beautifyTable(ele) {
  const tables = ele.querySelectorAll('table')
  tables.forEach((table) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'table-wrapper'
    table.parentNode?.insertBefore(wrapper, table)
    wrapper.appendChild(table)
  })
}
