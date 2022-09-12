import type { NextApiRequest, NextApiResponse } from 'next'

const pincode_avilable = ['263601', '11011', '263645', '248007']

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { pincode } = req.body

    res.json({ avilable: pincode_avilable.includes(pincode) })
  } else {
    res.status(400).json({ error: 'Method Not Allowed' })
  }
}
