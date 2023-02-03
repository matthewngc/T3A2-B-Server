import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserModel } from '../models/user.js'
import { ListingModel } from '../models/listing.js'

dotenv.config()

// const secret = process.env.JWT_SECRET_KEY

// export function authorize(employer) {
//     return [
//         console.log(expressjwt( {secret, algorithms: ['HS256']})),
//         // expressjwt( {secret, algorithms: ['HS256'] }),
//         (req, res, next) => {
//             if (!employer) {
//                 return res.status(401).send({ error: 'You are not authorized to perform this action' })
//             }
        
//             next()
//         }
//     ]
// }

// const ac = new AccessControl()

// export function authorize() {
//     ac.grant('jobseeker')
//         .createOwn('application')
//         .readOwn('application')
//         .deleteOwn('application')

//     ac.grant('employer')
//         .createOwn('listing')
//         .readAny('listing')
//         .updateOwn('listing')
//         .deleteOwn('listing')
//         .readOwn('application')
//         .deleteOwn('application')
// }

export const authenticate = async (req, res, next) => {
    try {
        let authHeader = req.headers["authorization"]
        if (authHeader === undefined) {
            return res.status(401).send({ error: 'You do not have permission to perform this action.'})
        }
        if (authHeader.startsWith('Bearer ')) {
            const accessToken = authHeader.substring(6).trim()
            const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
            req.user = verifiedToken
            // console.log(req.user)
            next()
        }
    } catch (err) {
        return res.status(401).send({ error: err.message })
    }
}

export const authorizeEmployer = async (req, res, next) => {
    const user = await UserModel.findById(req.user.id)
    // console.log(user)
    if (user.isEmployer) {
        next()
    } else {
        return res.status(401).send({ error: 'Only employers can perform this action.'})
    }
}

export const authorizeListingOwner = async (req, res, next) => {
    try{
    const listing = await ListingModel.findById(req.params.id).populate({path: 'company', select: 'company'})
    if (!listing) {
        return res.status(404).send({ error: 'No listing found under this ID.'})
    }
    if (listing.company.id != req.user.id) {
        return res.status(401).send({ error: 'Only the owner of this listing can perform this action.'})
    } else {
        next()
    }
}   catch (err) {
    return res.status(500).send({ error: err.message })
}
}