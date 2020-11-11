module.exports.validateRegisterInput = (
    userId,
    password,
    confirmPassword,
) => {
    const errors = {};
    if( userId.trim() === '') {
        errors.userId = 'ユーザーIDは必須項目です！'
    }
    if( password.trim() === '') {
        errors.password = 'パスワードは必須項目です！'
    } else if ( password !== confirmPassword ) {
        errors.confirmPassword = 'パスワードが一致しません！'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
};

module.exports.validateLoginInput = (userId, password, confirmPassword) => {
    const errors = {};
    if( userId.trim() === '') {
        errors.userId = 'ユーザーIDは必須項目です！'
    }
    if( password.trim() === '') {
        errors.password = 'パスワードは必須項目です！'
    } else if ( password !== confirmPassword ) {
        errors.confirmPassword = 'パスワードが一致しません！'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}