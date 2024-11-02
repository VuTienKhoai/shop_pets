export const formatPrice = (price) => {
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0, // Đảm bảo không có phần thập phân
        maximumFractionDigits: 0,
    }).format(price).replace('$', '');

    return formattedPrice.endsWith('.00') ? formattedPrice.slice(0, -3) : formattedPrice;
};