import JsonResponse from './JsonResponse'

export default class ImageResponse extends JsonResponse {
  sendImage (res, statusCode, data) {
    const buffer = Buffer.from(data, 'base64')
    res.writeHead(statusCode, {
      'Content-Type': 'image/jpeg',
      'Content-Length': buffer.length,
    })
    return res.end(buffer)
  }
}
