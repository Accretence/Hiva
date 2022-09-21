import { ca } from 'date-fns/locale'

export function calculateDiscountAmount(
    isDiscounted: boolean,
    totalAmount: number,
    discountObject
) {
    if (
        isDiscounted &&
        discountObject &&
        isDiscountAcceptable(discountObject)
    ) {
        const { maxAmount, percentage } = discountObject

        const discountableAmount = Math.floor(totalAmount * (percentage / 100))
        const discountAmount =
            discountableAmount > maxAmount ? maxAmount : discountableAmount

        return discountAmount
    } else return 0
}

export function calculateReferralAmount(
    isReferred: boolean,
    totalAmount: number,
    clientObject
) {
    if (isReferred && clientObject) {
        const {
            referralRewardPercentageToProvider,
            referralDiscountPercentageToConsumer,
            maxReferralReward,
            maxReferralDiscount,
        } = clientObject

        const discountableAmount = Math.floor(
            totalAmount * (referralDiscountPercentageToConsumer / 100)
        )
        const referralDiscount =
            discountableAmount > maxReferralDiscount
                ? maxReferralDiscount
                : discountableAmount

        return referralDiscount
    } else return 0
}

export function calculatePayableAmount(
    isDiscounted: boolean,
    isReferred: boolean,
    totalAmount: number,
    discountObject,
    clientObject
) {
    let payableAmount = totalAmount

    if (isDiscounted && discountObject) {
        payableAmount -= calculateDiscountAmount(
            isDiscounted,
            totalAmount,
            discountObject
        )
    }

    if (isReferred && clientObject) {
        payableAmount -= calculateReferralAmount(
            isReferred,
            totalAmount,
            clientObject
        )
    }

    return payableAmount
}

export function isDiscountAcceptable(discountObject) {
    const { maxUses, burntUses } = discountObject

    return maxUses > burntUses
}