export function calculateDiscountCost(totalCost: number, discountObject) {
    if (discountObject && isDiscountAcceptable(discountObject)) {
        const { maxUses, burntUses, maxAmount, percentage } = discountObject

        const discountableCost = Math.floor(totalCost * (percentage / 100))
        const discountCost =
            discountableCost > maxAmount ? maxAmount : discountableCost

        return discountCost
    } else {
        return totalCost
    }
}

export function calculatePayableCost(totalCost: number, discountObject) {
    if (discountObject) {
        return totalCost - calculateDiscountCost(totalCost, discountObject)
    } else {
        return totalCost
    }
}

export function isDiscountAcceptable(discountObject) {
    const { maxUses, burntUses } = discountObject

    return maxUses > burntUses
}
