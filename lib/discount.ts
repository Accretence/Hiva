export function calculateDiscountCost(totalCost: number, discountObject) {
    if (discountObject) {
        console.log({ discountObject })
        const { maxUses, burntUses, maxAmount, percentage } = discountObject

        if (burntUses < maxUses) {
            console.log('Valid Code')

            const discountableCost = totalCost * (percentage / 100)
            const discountCost =
                discountableCost > maxAmount ? maxAmount : discountableCost

            return discountCost
        } else {
            console.log('Burnt Code')
            return totalCost
        }
    }

    if (!discountObject) {
        console.log('No discount object found.')
        return totalCost
    }
}
export function calculatePayableCost(totalCost: number, discountObject) {
    if (discountObject) {
        return totalCost - calculateDiscountCost(totalCost, discountObject)
    }

    if (!discountObject) {
        return totalCost
    }
}
