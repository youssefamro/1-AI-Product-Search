const express = require('express');
const { getProductSuggestions, verifyAndScrapeProducts } = require('./controllers/productController');
const app = express();
const cors = require('cors');


app.use(cors());
// Middleware to parse JSON request bodies
app.use(express.json());

// Test POST endpoint
app.post('/api/test', (req, res) => {
    const requestData = req.body; // Get the data sent in the request body
    console.log("Received data:", requestData); // Log the received data for debugging
    res.json({
        message: "Data received successfully!",
        data: requestData // Echo back the received data
    });
});


example=[
    {
        "title": "Mr.Shield [3-Pack Designed For Xiaomi Redmi Note 11 Pro 5G+4G / Redmi Note 11 Pro+ / Redmi Note 11 Pro Plus [Tempered Glass] [Japan Glass with 9H Hardness] Screen Protector",
        "related": true,
        "price": "$6.95",
        "link": "https://www.amazon.com/Mr-Shield-Designed-Tempered-Protector-Replacement/dp/B09SLJ5F8W/ref=sr_1_1?dib=eyJ2IjoiMSJ9.6Kn_sbSzSNRSJqpLCu6fyuLUDcTbhtLcmHi-vgxRpPc5lyYgS0mrqyofaeRzpmkh8vE-h3FYHP8WzrQePR-1Tx9fs8vcc4UhLfnxDrKDlNVgZI1DB4AJuyC75NRn1R_ChAdWdiNSqTxuicEBaD3IYEkKWzvl4hCyFCtelXDLAczhYjkQidggBWASdsp4Ugy5m7uPXqRu4QKwQe1m2gV7jIVzcKcdvyk_qD-ojRhS37U.U7df8lyTDVmihAJ-96C_DIfifDqLtO3dwxZn2brC5VU&dib_tag=se&keywords=Redmi+Note+11+Pro+5G&qid=1730217308&sr=8-1"
    },
    {
        "title": "for Xiaomi redmi Note 11 Pro 5G/4G Case, Nillkin Slim case Protective Cover with Camera Protector Hard PC TPU Ultra Thin Anti-Scratch Phone Case for Xiaomi Redmi Note 11 Pro 5G (6.67'') (Black)",
        "related": true,
        "price": "$13.99",
        "link": "https://www.amazon.com/Xiaomi-Nillkin-Protective-Protector-Anti-Scratch/dp/B09YXLZNPL/ref=sr_1_2?dib=eyJ2IjoiMSJ9.6Kn_sbSzSNRSJqpLCu6fyuLUDcTbhtLcmHi-vgxRpPc5lyYgS0mrqyofaeRzpmkh8vE-h3FYHP8WzrQePR-1Tx9fs8vcc4UhLfnxDrKDlNVgZI1DB4AJuyC75NRn1R_ChAdWdiNSqTxuicEBaD3IYEkKWzvl4hCyFCtelXDLAczhYjkQidggBWASdsp4Ugy5m7uPXqRu4QKwQe1m2gV7jIVzcKcdvyk_qD-ojRhS37U.U7df8lyTDVmihAJ-96C_DIfifDqLtO3dwxZn2brC5VU&dib_tag=se&keywords=Redmi+Note+11+Pro+5G&qid=1730217308&sr=8-2"
    },
    {
        "title": "kwmobile Case Compatible with Xiaomi Redmi Note 11 Pro / 11 Pro (5G) / 12 Pro (4G) Case - TPU Silicone Phone Cover with Soft Finish - Black Matte",
        "related": true,
        "price": "$9.99",
        "link": "https://www.amazon.com/kwmobile-Silicone-Compatible-Xiaomi-Redmi/dp/B09WTQTC9P/ref=sr_1_3?dib=eyJ2IjoiMSJ9.6Kn_sbSzSNRSJqpLCu6fyuLUDcTbhtLcmHi-vgxRpPc5lyYgS0mrqyofaeRzpmkh8vE-h3FYHP8WzrQePR-1Tx9fs8vcc4UhLfnxDrKDlNVgZI1DB4AJuyC75NRn1R_ChAdWdiNSqTxuicEBaD3IYEkKWzvl4hCyFCtelXDLAczhYjkQidggBWASdsp4Ugy5m7uPXqRu4QKwQe1m2gV7jIVzcKcdvyk_qD-ojRhS37U.U7df8lyTDVmihAJ-96C_DIfifDqLtO3dwxZn2brC5VU&dib_tag=se&keywords=Redmi+Note+11+Pro+5G&qid=1730217308&sr=8-3"
    },
    {
        "title": "(3 Pack) Compatible for Xiaomi Poco X5 Pro Screen Protector Tempered Glass, Touch Sensitive,Case Friendly, 9H Hardness",
        "related": true,
        "price": "$7.85",
        "link": "https://www.amazon.com/beukei-Compatible-Protector-Tempered-Sensitive/dp/B0BWLYFC18/ref=sr_1_1?dib=eyJ2IjoiMSJ9.xNAJJXZn0M40ZnBb_q7qD8bQc_ztcGqP1L11dd6jnKpKKFJ5nUf-9YZfVvwdxHYifUeoUKehfnGmHEXOK4S5T7ViYUCrQzkTNJbGg8nIQga76tg8svmGy7G-fRBgv5KiREFaLHuvhJosjtPEm2674w.oF6wXp1VjDRHumxkaNUMk9HgkA2ImJVVVI5vKfB86Mw&dib_tag=se&keywords=Poco+X5&qid=1730217315&sr=8-1"
    },
    {
        "title": "Poco X6 PRO 5G + 4G LTE Global Unlocked (256GB + 8GB) GSM 6.67\" 64MP Triple Camera (Tmobile Mint Tello Global) + (Car Fast Car Dual Charger Bundle) (Grey (Global ROM))",
        "related": true,
        "price": "$282.00",
        "link": "https://www.amazon.com/Xiaomi-Global-Unlocked-Tmobile-Charger/dp/B0CRNSY2T5/ref=sr_1_2?dib=eyJ2IjoiMSJ9.xNAJJXZn0M40ZnBb_q7qD8bQc_ztcGqP1L11dd6jnKpKKFJ5nUf-9YZfVvwdxHYifUeoUKehfnGmHEXOK4S5T7ViYUCrQzkTNJbGg8nIQga76tg8svmGy7G-fRBgv5KiREFaLHuvhJosjtPEm2674w.oF6wXp1VjDRHumxkaNUMk9HgkA2ImJVVVI5vKfB86Mw&dib_tag=se&keywords=Poco+X5&qid=1730217315&sr=8-2"
    },
    {
        "title": "Screen Protector compatible with Xiaomi Poco X5 [Tempered Glass] [3-PACK] [Japan Glass with 9H Hardness]",
        "related": true,
        "price": "$3.47",
        "link": "https://www.amazon.com/Mr-Shield-Protector-Tempered-Hardness-Replacement/dp/B0BWTYNGWT/ref=sr_1_3?dib=eyJ2IjoiMSJ9.xNAJJXZn0M40ZnBb_q7qD8bQc_ztcGqP1L11dd6jnKpKKFJ5nUf-9YZfVvwdxHYifUeoUKehfnGmHEXOK4S5T7ViYUCrQzkTNJbGg8nIQga76tg8svmGy7G-fRBgv5KiREFaLHuvhJosjtPEm2674w.oF6wXp1VjDRHumxkaNUMk9HgkA2ImJVVVI5vKfB86Mw&dib_tag=se&keywords=Poco+X5&qid=1730217315&sr=8-3"
    },
    {
        "title": "[3-Pack] Designed For Realme 9 Pro+ / Realme 9 Pro Plus [Tempered Glass] [Japan Glass with 9H Hardness] Screen Protector with Lifetime Replacement",
        "related": true,
        "price": "$3.47",
        "link": "https://www.amazon.com/Mr-Shield-Designed-Tempered-Protector-Replacement/dp/B0B66BB3L1/ref=sr_1_1?dib=eyJ2IjoiMSJ9.WGrhyNv2WFwK9WBhszpic2a_W2dfuVzpiKv3AGmI5RoKV61BVOBv72GsCmtNhTbryoRh-lViscDs9r8_yTAlcqmAF7-ka07PXdB843ViaXaVQFe9C5k6_LJiJ2SvEakmdBl7b1BjngKypgVKnSiyNLDxKKWjLNe9CcJRY91z5ImbDecGSnD_Bx_vyGGX49_Soo0VC0H2B5IKQeGu3yWH2DxuhhVa2lkRvJZ0NydvExg.cY8Rbrpklh2eh8Tu8XgLQSDhNBVXEggxDAup_5E_low&dib_tag=se&keywords=Realme+9+Pro%2B&qid=1730217322&sr=8-1"
    },
    {
        "title": "Compatible with Realme 9 Pro+ 5G Bracket Shell,with Slide Camera Lens Cover Compatible with Realme 9 Pro Plus 5G RMX3392 RMX3393 Case Black",
        "related": true,
        "price": "$10.80",
        "link": "https://www.amazon.com/Kukoufey-Compatible-Pro-Bracket-RMX3392/dp/B0CGPVDH5Y/ref=sr_1_2?dib=eyJ2IjoiMSJ9.WGrhyNv2WFwK9WBhszpic2a_W2dfuVzpiKv3AGmI5RoKV61BVOBv72GsCmtNhTbryoRh-lViscDs9r8_yTAlcqmAF7-ka07PXdB843ViaXaVQFe9C5k6_LJiJ2SvEakmdBl7b1BjngKypgVKnSiyNLDxKKWjLNe9CcJRY91z5ImbDecGSnD_Bx_vyGGX49_Soo0VC0H2B5IKQeGu3yWH2DxuhhVa2lkRvJZ0NydvExg.cY8Rbrpklh2eh8Tu8XgLQSDhNBVXEggxDAup_5E_low&dib_tag=se&keywords=Realme+9+Pro%2B&qid=1730217322&sr=8-2"
    },
    {
        "title": "Case Compatible with Realme 9 Pro Plus Transparent Clear, Protector Compatible with Realme 9 Pro Plus Heavy Duty, Case Compatible with Realme Anti-Shock Shockproof TPU.",
        "related": true,
        "price": "$10.99",
        "link": "https://www.amazon.com/INSTACASE-Compatible-Transparent-Anti-Shock-Shockproof/dp/B0CNWQ4MCZ/ref=sr_1_3?dib=eyJ2IjoiMSJ9.WGrhyNv2WFwK9WBhszpic2a_W2dfuVzpiKv3AGmI5RoKV61BVOBv72GsCmtNhTbryoRh-lViscDs9r8_yTAlcqmAF7-ka07PXdB843ViaXaVQFe9C5k6_LJiJ2SvEakmdBl7b1BjngKypgVKnSiyNLDxKKWjLNe9CcJRY91z5ImbDecGSnD_Bx_vyGGX49_Soo0VC0H2B5IKQeGu3yWH2DxuhhVa2lkRvJZ0NydvExg.cY8Rbrpklh2eh8Tu8XgLQSDhNBVXEggxDAup_5E_low&dib_tag=se&keywords=Realme+9+Pro%2B&qid=1730217322&sr=8-3"
    },
    {
        "title": "for Samsung Galaxy A53 5G Case with 2 Pack Screen Protector, 360° Rotatable Ring Holder [Luxury Hearts Pattern] Plating Gold Edge Slim Soft Phone Cover Case for Galaxy A53 - Purple",
        "related": true,
        "price": "$8.99",
        "link": "https://www.amazon.com/Nonional-Samsung-A53-Protector-Rotatable/dp/B0DD3LNWR4/ref=sr_1_3?dib=eyJ2IjoiMSJ9.K8pJh3IV6iFTJA1b4S-412ke7pMrOC37Fwd8wU2ehjuqU7oGu4e-H9diZc6mw8w31ew48GNC0h07Ej3aDFxOSKLxfwcUwTlGfnDdRTSSHrS2kQjbJ9g8dFrUL1V9m2ltKTt8FVykF-xjsCtBnx4wgB92xW9AC0MthpthEdgNV6OQ4733DINYStLV3yKclNFh29pGBp3WhshHRYiHQADS-be9TKYhAk5OQi_PCnBZgk4.qNfZ5o-Dz_ZvW-VclhFrMr2_7qgjAdd7BrS_H3MOoXI&dib_tag=se&keywords=Samsung+Galaxy+A53+5G&qid=1730217327&sr=8-3"
    },
    {
        "title": "Dual Guard for Samsung Galaxy A53 Case, Shockproof Protection Layer Case 5G - Forest Green",
        "related": true,
        "price": "$14.99",
        "link": "https://www.amazon.com/Crave-Samsung-Galaxy-Shockproof-Protection/dp/B09QBTD8ZD/ref=sr_1_4?dib=eyJ2IjoiMSJ9.K8pJh3IV6iFTJA1b4S-412ke7pMrOC37Fwd8wU2ehjuqU7oGu4e-H9diZc6mw8w31ew48GNC0h07Ej3aDFxOSKLxfwcUwTlGfnDdRTSSHrS2kQjbJ9g8dFrUL1V9m2ltKTt8FVykF-xjsCtBnx4wgB92xW9AC0MthpthEdgNV6OQ4733DINYStLV3yKclNFh29pGBp3WhshHRYiHQADS-be9TKYhAk5OQi_PCnBZgk4.qNfZ5o-Dz_ZvW-VclhFrMr2_7qgjAdd7BrS_H3MOoXI&dib_tag=se&keywords=Samsung+Galaxy+A53+5G&qid=1730217327&sr=8-4"
    },
    {
        "title": "Compatible with Samsung Galaxy A53 5G Case,Cute Rose Flower Butterfly Cool Black Solid Design,Soft Silicone Slim Thin Girly Phone Case Protective Shockproof Cover for Women Girls-Rose",
        "related": true,
        "price": "$9.99",
        "link": "https://www.amazon.com/MINSCOSE-Compatible-Protective-Shockproof-Girls-Rose/dp/B0D1C8J755/ref=sr_1_5?dib=eyJ2IjoiMSJ9.K8pJh3IV6iFTJA1b4S-412ke7pMrOC37Fwd8wU2ehjuqU7oGu4e-H9diZc6mw8w31ew48GNC0h07Ej3aDFxOSKLxfwcUwTlGfnDdRTSSHrS2kQjbJ9g8dFrUL1V9m2ltKTt8FVykF-xjsCtBnx4wgB92xW9AC0MthpthEdgNV6OQ4733DINYStLV3yKclNFh29pGBp3WhshHRYiHQADS-be9TKYhAk5OQi_PCnBZgk4.qNfZ5o-Dz_ZvW-VclhFrMr2_7qgjAdd7BrS_H3MOoXI&dib_tag=se&keywords=Samsung+Galaxy+A53+5G&qid=1730217327&sr=8-5"
    }
]



// Existing /api/search endpoint
app.post('/api/search', async (req, res) => {
    const userPrompt = req.body.prompt; // Expecting the prompt in the request body
    
    console.log("User prompt received:", userPrompt); // For debugging
    try {
        const { productNames, category } = await getProductSuggestions(userPrompt);
        console.log("Product Names:", productNames, "Category:", category); // For debugging
        const verificationResults = await verifyAndScrapeProducts(productNames, userPrompt, category);
        //res.json(verificationResults);
        res.json([productNames,verificationResults]);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});


app.get('/api/test', (req, res) => {
    res.json({ message: "API is working!" });
});

module.exports = app; // Export the app to be used in server.js




