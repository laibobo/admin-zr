import PDFJS from 'pdfjs-dist'

export async function loadPdf({ el, fileSrc, scale = 2 }) {
    let pdfCol = document.querySelector(el)
    let pdf = await PDFJS.getDocument(fileSrc)
    let pages = pdf.numPages
    let arryStr = []
    for (let i = 1; i <= pages; i++) {
        let canvas = document.createElement('canvas')
        let page = await pdf.getPage(i)
        let viewport = page.getViewport(scale)
        let context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width
        let renderContext = {
            canvasContext: context,
            viewport: viewport
        }
        await page.render(renderContext)
        canvas.className = 'canvas'
        pdfCol.appendChild(canvas)
    }
    return true
}