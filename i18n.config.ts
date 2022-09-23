const url = process.env.NEXT_PUBLIC_URL

const title = {
    en: 'Hiva',
    fa: 'هیوا',
}

export default {
    title,
    meta: {
        description: {
            en: 'Small text as a description for the page.',
            fa: 'متن استفاده شده در صفحه مربوطه.',
        },
        image: 'https://i.imgur.com/NitQE9d.jpg',
        url,
        handle: '@example',
        keywords: 'nextjs, reactjs',
    },
    components: {
        nav: {
            mobile: [
                {
                    en: 'Home',
                    value: '/',
                },
                {
                    en: 'Contact',
                    value: '/contact',
                },
                {
                    en: 'About',
                    value: '/about',
                },
                {
                    en: 'Blog',
                    value: '/blog',
                },
                {
                    en: 'Docs',
                    value: '/docs',
                },
            ],
        },
    },
    pages: {
        index: {
            title: {
                en: 'Index',
                fa: 'خانه',
            },
            description: {
                en: 'Index Page',
                fa: 'صفحه خانه',
            },
        },
        cart: {
            title: {
                en: 'Cart',
                fa: 'سبد خرید',
            },
            description: {
                en: 'Cart Page',
                fa: 'صفحه سبد خرید',
            },
            receipt: {
                total: {
                    en: 'Total Cost',
                    fa: 'هزینه کل',
                },
                discounted: {
                    en: 'Discounted Cost',
                    fa: 'مقدار تخفیف',
                },
                payable: {
                    en: 'Payable Cost',
                    fa: 'قابل پرداخت',
                },
                address: {
                    en: 'Address',
                    fa: 'آدرس',
                },
            },
        },
        order: {
            title: {
                en: 'Order',
                fa: 'سفارش',
            },
            description: {
                en: 'Order Page',
                fa: 'صفحه سفارش',
            },
            info: {
                title: {
                    en: 'Order Info',
                    fa: 'اطلاعات سفارش',
                },
                description: {
                    en: 'Detailed information about this order.',
                    fa: 'جزییات دقیق در باره این سفارش',
                },
            },
            products: {
                title: {
                    en: 'Order Products',
                    fa: 'محصولات سفارش',
                },
                description: {
                    en: 'List of products in this order.',
                    fa: 'لیست محصولات سفارش داده شده در این سفارش',
                },
            },
        },
        product: {
            title: {
                en: 'Product',
                fa: 'محصول',
            },
            description: {
                en: 'Product Page',
                fa: 'صفحه محصول',
            },
        },
        products: {
            title: {
                en: 'Products',
                fa: 'محصولات',
            },
            description: {
                en: 'Products Page',
                fa: 'صفحه محصولات',
            },
            filter: {
                title: {
                    en: 'Filter Products',
                    fa: 'فیلتر محصولات',
                },
                subtitle: {
                    en: 'Set of options to filter out products',
                    fa: 'مجموعه گزینه ها برای فیلتر محصولات',
                },
            },
        },
        pricing: {
            title: {
                en: 'Pricing',
                fa: 'قیمت گذاری',
            },
            description: {
                en: 'Pricing Page',
                fa: 'صفحه قیمت گذاری',
            },
        },
        dashboard: {
            title: {
                en: 'Dashboard',
                fa: 'داشبورد',
            },
            description: {
                en: 'Dashboard Page',
                fa: 'صفحه داشبورد',
            },
        },
        user: {
            title: {
                en: 'User',
                fa: 'حساب کاربری',
            },
            description: {
                en: 'User Page',
                fa: 'صفحه حساب کاربری',
            },
            info: {
                title: {
                    en: 'User Info',
                    fa: 'اطلاعات کاربری',
                },
                description: {
                    en: 'Basic information you have provided.',
                    fa: 'اطلاعات کاربری',
                },
                name: {
                    en: 'Name',
                    fa: 'نام و نام خانوادگی',
                },
                email: {
                    en: 'Email',
                    fa: 'ایمیل',
                },
                referral: {
                    en: 'Referral Code',
                    fa: 'کد معرف',
                },
            },
            orders: {
                title: {
                    en: 'Orders',
                    fa: 'سفارشات',
                },
                description: {
                    en: 'Your order history.',
                    fa: 'تاریخچه سفارشات شما',
                },
            },
            referrals: {
                title: {
                    en: 'Referrals',
                    fa: 'تاریخچه کد معرف',
                },
                description: {
                    en: 'Your referral history.',
                    fa: 'تاریخچه استفاده از کد معرف شما',
                },
            },
            integrations: {
                title: {
                    en: 'Integrations',
                    fa: 'پیوند ها',
                },
                description: {
                    en: 'Your integrations with third-party services.',
                    fa: 'پیوند های شما با سرویس های دیگر',
                },
            },
            logout: {
                title: {
                    en: 'Logout',
                    fa: 'خروج',
                },
                description: {
                    en: 'Logout from your account',
                    fa: 'از حساب کاربری خود خارج شوید.',
                },
            },
        },
        about: {
            title: {
                en: 'About',
                fa: 'درباره ما',
            },
            description: {
                en: 'This package provides a 1-Line script that sets in motion a barrage of tools and web-services to create a highly-customizable state-of-the-art Next.js PWA, like this one!',
                fa: 'این پکیج اسکریپتی 1 خطه را در اختیار قرار می دهد و  طوفانی از ابزار ها را به حرکت درآورده تا اپلیکیشن اینترنتی مدرنی را در اختیار کاربر بگذارد.',
            },
            content: {
                en: 'NPX is a tool intended to help round out the experience of using packages from the npm registry — the same way npm makes it super easy to install and manage dependencies hosted on the registry, npx makes it easy to use CLI tools and other executables hosted on the registry. It greatly simplifies a number of things that, until now, required a bit of ceremony to do with plain npm.',
                fa: 'NPX ابزاری است که برای کمک به تکمیل تجربه استفاده از بسته‌ها از رجیستری npm در نظر گرفته شده است - همان طور که npm نصب و مدیریت وابستگی‌های میزبانی شده در رجیستری را بسیار آسان می‌کند، npx استفاده از ابزارهای CLI و سایر فایل‌های اجرایی میزبانی شده را آسان می‌کند. رجیستری این کار تعدادی از مواردی را که تا به حال نیاز به کمی تشریفات برای npm ساده داشت، بسیار ساده می کند.',
            },
        },
        blog: {
            title: {
                en: 'Blog',
                fa: 'بلاگ',
            },
            description: {
                en: 'Blog sample page.',
                fa: 'صفحه بلاگ',
            },
            content: {
                en: 'Blog placeholder page.',
                fa: 'صفحه بلاگ',
            },
        },
        contact: {
            title: {
                en: 'Contact',
                fa: 'تماس با ما',
            },
            description: {
                en: 'Way to get in contact.',
                fa: 'راه های تماس با ما',
            },
            content: {
                en: 'You can get in contact with us using this methods.',
                fa: 'برای تماس با ما می توانید از این راه ها استفاده کنید..',
            },
        },
        login: {
            title: {
                en: 'Login or Register',
                fa: 'ورود یا ثبت نام',
            },
            description: {
                en: 'Login or Register',
                fa: 'ورود یا ثبت نام',
            },
        },
        forgot: {
            title: {
                en: 'Forgot Password',
                fa: 'تغییر رمز عبور',
            },
            description: {
                en: 'Reset your password using the verification code sent to your email address.',
                fa: 'با استفاده از کد تایید ارسال شده به ایمیل شما، رمز عبور خود را تغییر دهید.',
            },
        },
        subscription: {
            title: {
                en: 'Subscription',
                fa: 'ویرایش عضویت در لیست ایمیل',
            },
            description: {
                en: 'For security purposes, you should be logged-in in order to subscribe.',
                fa: 'به دلایل امنیتی، ابتدا نیاز به ورود به سایت دارید.',
            },
        },
        verify: {
            title: {
                en: 'Verify Email Address',
                fa: 'تایید ایمیل',
            },
            description: {
                en: 'Verify your email address using the verification code sent to your email address.',
                fa: 'با استفاده از کد تایید ارسال شده به ایمیل، ایمیل خود را تایید کنید.',
            },
        },
    },
}
