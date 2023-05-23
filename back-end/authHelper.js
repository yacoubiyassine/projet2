import bcrypt from 'bcrypt'

export const hashPassword=async(password)=>{
    try {
        const saltRounds=6.
        const hashedPassword = await bcrypt.hash(password,saltRounds) 
        return hachedPassword
    } catch (error) {
        console.log(error);
    }
}
export const comparePassword = async (password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
}