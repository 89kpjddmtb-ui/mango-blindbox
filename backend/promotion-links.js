// 推广链接数据库 - 32个商品（已核对，截图与链接一一对应）
// 更新日期：2026-02-16
// 对应关系：截图1.jpg <-> Excel第1行链接，截图2.jpg <-> Excel第2行链接，以此类推

const promotionLinks = {
  // 分类1：hero (1-4号商品)
  hero: [
    { 
      sku: '100001', 
      name: '兰博基尼合金车模', 
      desc: '合金汽车模型仿真收藏摆件，精致细节，兰博基尼毒药模型', 
      keyword: '英雄守护', 
      price: 148, 
      image: '',
      emoji: '🦸',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BAUgJK1olXw4AXF5eAEkQA18IGlsWVA4EUl1aCk4RB19MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWA2wBE10TXgEAUVhZFxJSXzIGXwRNA1l-AAsFWC5HVWMLdVp7XTYHAx4aYSh0dAwNeTtxWFRYFRgATgpRD2M4GmsWXAQEXF5YAU8UM18IHGtUMwYHVVZYAUIUM244G10TXQYFU1dZCkwVBF8PG1IlBlNsMDUgWg5kZjt3cgNSbTYyV25aCEIDBR1JSU8TLzYyVG5eOEsWA24MHl4RXAQDSF5cDUwUAHMIHV0VXQEFXVtfD0MWM20JGl8cbTbc2so6CiJLfm9dbgVqA3JVLB071sWDEh14G18UWxcyMyFeXhFURBZzWwgQGVhANzgufjkUBi0OdVliK1B1HDs6SjARRBpATjNMBjYHZFleCkkn'
    },
    { 
      sku: '100002', 
      name: '自由女神阿尼亚手办', 
      desc: '阿尼亚自由女神造型手办，动漫模型摆件，可爱造型16CM', 
      keyword: '超人力量', 
      price: 10.17, 
      image: '',
      emoji: '🦸‍♂️',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATQJK1olXwEHVV5fC08VAV8IGlsRWwYKUV1cD08WBV9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWA2sOG1MQXgcFUF9bFxJSXzI4ZDlDFkNfCTo4DkhfVBYMejtMKmdfAlJROEonAG4KHVMVWA8GV25tCEwnQgELG14WWQEBXW5cOEsRBW8IHFwcVQYDVV1tD0seMzRddT9-IFRHJzsJdyJPRF84K1glWgYLQFgvSRkDBR04K1slXjYCVV5cDE4SB24KGkcVXAMFV11BCE0RA28PHFIQXwEKVW5fCUoTCl84xdalJw9wIBkoTjlLRBhMYlJIANiP5E8hf0kVC24ZK1lKO2IHMzwcfS9DeQ10GRATLXoKDCYfSSUVUShpeFJMNgB3FjwOQx0Xdyk4HmsSXgQAZA'
    },
    { 
      sku: '100003', 
      name: 'MINISO 疯狂动物城盲盒', 
      desc: '名创优品迪士尼疯狂动物城系列盲盒，朱迪尼克手办摆件', 
      keyword: '英雄日常', 
      price: 59, 
      image: '',
      emoji: '🦊',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BAUkJK1olXQMFXVpbCE8RA18IGloWXAQFXV9bDk8nRzBQRQQlBENHFRxWFlVPRjtUBABAQlRcCEBdCUoUAm0PEloTWwIdDRsBVUVTXDdWRCdBCF5SMQ4LBEh5AgEIKxBJGltdAAELahthATlVQV8LOkRDAi5RBHsWM2wJGV0dXQMLUF1tOEsQMy1mQA57AVRKHYfrk5K2l18JK1sTWwYCU1lVCEkSBmk4HFscbV1XOjo2dRlScApcZDJNGjYyZF1tD0seF2l6WgkBW3QyZF5tC3sXAm8JH14QWQcAVUJdCU4QAGwUG10TXQYFU1dYCkwfAl8KGloRVDYyitPtdk9rWzV4cABsBwdqDSYqDZWas350f18VXAMTZB4aUTB0dg1zGQ9zCkRRLi0DfhQTXRpBYjUSHUALNDcnSBJwahRzUzpDWwAyUW5aC0kVMw'
    },
    { 
      sku: '100004', 
      name: '海贼王尼卡路飞手办', 
      desc: '海贼王手办太阳神尼卡路飞五档，雷电尼卡模型摆件', 
      keyword: '联盟荣耀', 
      price: 22.44, 
      image: '',
      emoji: '🦸‍♀️',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATQJK1olXwMFVVtaD0keAF8IGlodVQIEXF1fAEoTCl9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWAmcAH10dXgQKVVpUFxJSXzI4TBpBNFhBNFw-fhdfcRF4YidUIARWElJROEonAG4KHVMVWA8GV25tCEwnQgEIHFkWVA4AUm5cOEsRBW8IHFwdWA4BVl1tD0seMzRddT9-IFRHJzsJdyJPRF84K1glWgYLQFgvSRkDBR04K1slXjYCVV5cDUMeBGYKGEcVXgAHUVpBCE0RA28PHFMQXQIKU25fCUoTCl84xdWBOQIEBF4vYEhIBjp6QyVKIdiMwE8hbE8XAmoZKydmKEBQBgk0cjhHYwZYeR5JKXNFElwqbCUVfgRoeVl1NER4FwM_SjVUARY4HmsSXgQAZA'
    }
  ],
  
  // 分类2：warm (5-9号商品)
  warm: [
    { 
      sku: '100005', 
      name: '小黄人十二生肖摆件', 
      desc: '环球影业小黄人手办，十二生肖系列盲盒，马年款', 
      keyword: '星光守护', 
      price: 39, 
      image: '',
      emoji: '✨',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATUJK1olXw4CUl5YDk0QBF8IGlgUWgAFVlxdCkMSCl9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWAG4PHVwXXwYAXFtUFxJSXzI4fDhhHG0KA1k9SkxwUW52bD5DIV1BElJROEonAG4KHVMVWA8GV25tCEwnQgELGF0WWAQCVF1tCXsXBWkIG1wSVQAHXVhdOEwXCl9TTjVxNntQES04XDR-Wyg4K2sWbQECXUpbegpFF2l6K2sVbQUyVF9dCU4fCmgBGVgJXQUEUVtZFEsRBW8IHFwdWAYGXFltCkoWB2Y4K4WbyX4LJykAeEl0XDh4bj9hOFzc2spMejsXB2gMCmtLC2cFVC0rY0gWWWd-cg8cP3oLJyBcCyN5ASxNSRx-An11Vzlab01geS96K14lWgUAVm4'
    },
    { 
      sku: '100006', 
      name: '关节可动人偶 Dummy13', 
      desc: 'Dummy13关节可动人偶手办，多关节可动，白色款', 
      keyword: '香氛浪漫', 
      price: 8.99, 
      image: '',
      emoji: '🕯️',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATQJK1olXwEHVFpdCE4TBF8IGlscXwAGVVZeDk0TAV9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWA2YKHV8UVQUEUlpfFxJSXzI4cloQHENnJwY9blF8dRgMfzpQK11lJFJROEonAG4KHVMVWA8GV25tCEwnQgELGlwUXQUHVG5cOEsRBW8IHFwdVQEKUFhtD0seMzRddT9-IFRHJzsJdyJPRF84K1glWgYLQFgvSRkDBR04K1slXjYCVV5cDUMeBGYKGEcVXgAHUVpBCE0RA28PHFMQXQIKU25fCUoTCl84xdWBKQJJXCFeSDsTcQhfby5HDtiMwE82cUsfC2kZKzBiJnl_Ei0oSi5Mfy8JTCVyImJ3UyA_UCUVfBMITgUQNFFAUV4oDA5-dAs4HmsSXgQAZA'
    },
    { 
      sku: '100007', 
      name: '招财猫十二生肖摆件', 
      desc: '招财猫十二生肖手办，盲盒玩具，可爱造型摆件', 
      keyword: '温暖守护', 
      price: 24, 
      image: '',
      emoji: '🔥',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BASkJK1olXDYCVV9fC0sQAG0KEl4lGVlaCgFtUQ5SQi0DBUVNGFJeSwUIFxlJX3EIGloXXgYFV1xfAU4IWipURmt0Wm4ECS0bUSlweQRyYhlGHG9qPQEbBEcnAl8LGlkTVQYHXVpeOHsXBF9edVsUXgQBUVhcDE4nAl8IHV0VXQEEVV5aC00fM2gIEmtOCGhmPyMPTThyVxBhQxwlbTYBZFldAV8RcS5aD11nbTYCZF1tCEoXAmoAElwcXwUeVF1bDU4TH28OHVsVWgEKUV5ZAEwnAW4JH1IlbdiP5DgocxdyAyx_RiJKOgN_VAeDhfsGfxgBGVkRTDZiXDU5cTdeAAhYaBlvNWELFg1cQQgRdm5mGTlgW0ReXSQgbx1Nam94EzBobQMyU11fCns'
    },
    { 
      sku: '100008', 
      name: '关节可动人偶 Dummy13', 
      desc: 'Dummy13关节可动人偶手办，多关节可动，透明/黑色款', 
      keyword: '温暖围绕', 
      price: 8.89, 
      image: '',
      emoji: '🧣',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATMJK1olXwEHVFpdCE4TBF8IGlscXwAGVV9aAEoWCl9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWA2YKHV8UXAEKVV9UFxJSXzI4WSJCCEVnFyQ9SUh-ShZIXSVXX3MYElJROEonAG4KHVMVWA8GV25tCEwnQgELGlwUXQUHVG5cOEsRBW8IHF0UXw8EU15tD0seMzRddT9-IFRHJzsJdyJPRF84K1glWgYLQFgvSRkDBR04K1slXjYCVV5cDUMeBGYKGEcVXgAHUVpBCE0RA28PHFMQXQIKU25fCUoTCl84xdalPnZ8MCpYbUpuBRlSayVlINiP5E8vY0sTBn44RQ10WgZxIjVeCREfeh1QHwJpVGFjNFgcZklURj1PcARuKgVlUwMgWghjcV8NK1wWXwQy'
    },
    { 
      sku: '100009', 
      name: '机甲人偶手办', 
      desc: 'Dummy13幸运人偶手办，多关节可动机甲，黄色款', 
      keyword: '暖心温度', 
      price: 14.29, 
      image: '',
      emoji: '🥤',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATQJK1olXwEHV11ZAUseA18IGlscWAcGXFxaCEMeBV9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWA2YNGl8dXwECXFdbFxJSXzI4Zyt2JXFRCg4_Xi1NeGtTGQRCFXBCNFJROEonAG4KHVMVWA8GV25tCEwnQgELGlwUXQUHVG5cOEsRBW8IHF0UWQMEVVttD0seMzRddT9-IFRHJzsJdyJPRF84K1glWgYLQFgvSRkDBR04K1slXjYCVV5cDUMeBGYKGEcVXgAHUVpBCE0RA28PHFMQXQIKU25fCUoTCl84xdWBNnJ2EiEqSQsUS2YBYxhxGdiMwE8veEsTBGsZKwcSHGZRUloFSTdjYGtuRBNNDVUCIFpeUyUVXiR6GBIXCV1DISM2VhweSh84HmsSXgQAZA'
    }
  ],
  
  // 分类3：cute (10-14号商品)
  cute: [
    { 
      sku: '100010', 
      name: '蜡笔小新盲盒 点心时间', 
      desc: '蜡笔小新点心时间手办盲盒，可爱造型公仔', 
      keyword: '萌力全开', 
      price: 5.35, 
      image: '',
      emoji: '🥭',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATQJK1olXwEEVV1VDU4eBF8IGlsSXgADXFleDkITBV9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWA2gLHVodWgUEXVpbFxJSXzI4HCFnWxhxVgg4bD1QUSRVeF1yNVxeNFJROEonAG4KHVMVWA8GV25tCEwnQgELG1MSWwUBXW5cOEsRBW8IHF0UWwcCUl1tD0seMzRddT9-IFRHJzsJdyJPRF84K1glWgYLQFgvSRkDBR04K1slXjYCVV5cDUMeBGYKGEcVXgAHUVpBCE0RA28PHFMQXQIKU25fCUoTCl84xdWBPAdyD1wqYR5zVy9vXShQHNiMwE8hf08QCm8ZKxNWPXtQCR8GWA9tYW9QbD9-AWVRMVY-dyUVVTZ2TzxTGAJSJB8CXkNRYAc4HmsSXgQAZA'
    },
    { 
      sku: '100011', 
      name: '孤独摇滚后藤一里手办', 
      desc: '孤独摇滚后藤一里手办，动漫波奇酱，可爱少女摆件', 
      keyword: '萌趣随行', 
      price: 27.3, 
      image: '',
      emoji: '🧸',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATQJK1olXwcKVl9eD0wRBl8IGlodWgAGUFZZD00RA19MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWAmcPHV8RVQIFUlhdFxJSXzI4UhxGNE92Kik-UD1PSBldaD1hAnkBNFJROEonAG4KHVMVWA8GV25tCEwnQgEIGF4QXQcKUG5cOEsRBW8IHF0UVAUGUlttD0seMzRddT9-IFRHJzsJdyJPRF84K1glWgYLQFgvSRkDBR04K1slXjYCVV5cDUMeBGYKGEcVXgAHUVpBCE0RA28PHFMQXQIKU25fCUoTCl84xdWBNg94DyBUSRkRX2ZOZi5qXdiMwE82cUsfC2kZK1IWJXB6LQ47VCNPXWdsGwBNJQEEUDteDyUVWTJ3TFJ8GXpeVSNVYS5haGc4HmsSXgQAZA'
    },
    { 
      sku: '100012', 
      name: '太乙真人手办', 
      desc: '哪吒之魔童降世太乙真人手办，胖师傅摆件，动漫周边', 
      keyword: '甜美可爱', 
      price: 28, 
      image: '',
      emoji: '🎀',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATQJK1olXwEHV1deCkMWA18IGlsRVQMBXV9bCk0VAV9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWA2sAHlgcXAAAUlxfFxJSXzI4eB1BB2cHHws-bDFyYglzWlwLPGRxAlJROEonAG4KHVMVWA8GV25tCEwnQgELG14QXgcHVW5cOEsRBW8IHF0UVQMDV1ttD0seMzRddT9-IFRHJzsJdyJPRF84K1glWgYLQFgvSRkDBR04K1slXjYCVV5cDUMeBGYKGEcVXgAHUVpBCE0RA28PHFMQXQIKU25fCUoTCl84xdalKgJCJjVcVj1xYit7YA9TB9iP5E8veEsVAW8ZKxxOPkEHDV8lAU1hSzNveDlmFlRLXCEKayUVBW1jZzJcHm0LDl8JQ0l8ZjM4HmsSXgQAZA'
    },
    { 
      sku: '100013', 
      name: '恐龙模型玩具', 
      desc: '恐龙玩具模型，侏罗纪世界仿真霸王龙，儿童玩具', 
      keyword: '创意无限', 
      price: 24.90, 
      image: '',
      emoji: '✂️',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATkJK1olXw4HVlxZCEgeBV8IGloWWAUKV1xZCksnRzBQRQQlBENHFRxWFlVPRjtUBABAQlRcCEBdCUoUBmwAGFkRXwYdDRsBVXtXfw1TSQBBKmMHTi4KCjhhXSkLSxhDUQoyVW5eCUkRC28NEl8WbTYCU24fZp-esbeLq4-rw9CUyonwkUgWM244G10TXQYFUl5dCksQC18PG1IlBlNsMDUgWg5kZjt3cgNSbTYyV25aCEIDBR1JSU8TLzYyVG5eOEsWA24NE1ISVAQBSF5eDk4SB3MIHV0VXQEFXFtdDEMQM20JGl8cbTbc2sooCzgWUBhgXFpjPm5eHScj1sWDEhN_El8RWRcyNSZecjlERwdPRgRSI11iJysmaBB2UG1DdVlhPnZDET5dWAxPQ2hbRBN2FTYHZFleCkkn'
    },
    { 
      sku: '100014', 
      name: 'POP MART名侦探柯南手办', 
      desc: '泡泡玛特名侦探柯南手办，盲盒玩具公仔，动漫周边', 
      keyword: '温暖陪伴', 
      price: 30, 
      image: '',
      emoji: '🐾',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATUJK1olXw4HVVhVD0oQC18IGlscWw8LUl5VD0sUBF9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWA2YOElITXQ4FVF1aFxJSXzI4eT1NPGRdJwE-cBdtdD9jHi1cA3UGElJROEonAG4KHVMVWA8GV25tCEwnQgEIGl8dWgUHUl9tCXsXBWkIG1wTXQQDVldcOEwXCl9TTjVxNntQES04XDR-Wyg4K2sWbQECXUpbegpFF2l6K2sVbQUyVF9dCU8QB2oLHFgJXQIDVVdfFEsRBW8IHF0WWwIAU1ltCkoWB2Y4K4WbyX0EEy02D09iaCZtZQdePFLc2spMdDwTBGYICmsTWQYCM1hdbTxuCzBSWTtzB1BbUw0PfR95AShbfjpII3txIxgiWi5XZAZTK14lWgUAVm4'
    }
  ],
  
  // 分类4：tech (15-20号商品)
  tech: [
    { 
      sku: '100015', 
      name: '龙珠孙悟空手办', 
      desc: '七龙珠手办Q版龙珠Z2，少年动漫手办模型，桌面摆件', 
      keyword: '声动人心', 
      price: 24, 
      image: '',
      emoji: '🔊',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATIJK1olXgEDVlxbAUgeBl8IGlsTWwUGUV5UCU0UA19MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWA2kOGF8QXQ8DUl1dFxJSXzI4BRh-WlBxXBg-Ux91Ci1WbiNCAHF6AlJROEonAG4KHVMVWA8GV25tCEwnQgEPHFIRVA4yVW5dDk0XA2gOG18VVAIEZFldAXtMVgFscCZHGHVnACE0UAwnM18LK1wVVBIEJh8PHE1lM18IK1glXQcCVVpZCkwVAG0UG1sWWQ4BSF5bDksXBGkIHlkWWAQyVl9cDEInM7GGjzIVLQ9_UVklDRRuXB1taBDL05ITPyddAEMREl94fj5cHQZbXQQgcDBQXDd8YQMTJ398AgQzCi1jRQRwRThmBwJdCCAbTkxzM2o4HFgXXzY'
    },
    { 
      sku: '100016', 
      name: '动漫学生手办', 
      desc: '动漫手办学生校服少女，蹲坐姿势手办，桌面摆件', 
      keyword: '解放双手', 
      price: 29.90, 
      image: '',
      emoji: '📱',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATQJK1olXwcLVlxeCU0QBV8IGlsVXw8GVF1YAEIQC19MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWA28KEl8VXgMKXVlVFxJSXzI4UCxpXGN8AAE4CBsQehJSG1pKFVN7AlJROEonAG4KHVMVWA8GV25tCEwnQgEIGF8UWAcGV25cOEsRBW8IHF0VVA8LU11tD0seMzRddT9-IFRHJzsJdyJPRF84K1glWgYLQFgvSRkDBR04K1slXjYCVV5cDE4SBmcBH0cVWgMKVl1BCE0RA28PHVsSVAAEUG5fCUoTCl84xdWBLnRxJz5cahMSSmphZwdOINiMwE8veEsTBGsZKyx-K1NQXQYZUyhWAgdSSDhgO35BIS4pUSUVZBxhbyAVGXRZBAY_dUJtUxY4HmsSXgQAZA'
    },
    { 
      sku: '100017', 
      name: '黑神话悟空手办盲盒', 
      desc: '黑神话悟空手办盲盒，游戏周边摆件，齐天大圣系列', 
      keyword: '温暖微光', 
      price: 24.80, 
      image: '',
      emoji: '💡',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATQJK1olXwIHU11VD0kTC18IGlsWXgMGU1dZAUIXBF9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWA2wLHl8SVAILXV5aFxJSXzI4HCERHWEAMgI-TjEJUzMPeCh-R014ElJROEonAG4KHVMVWA8GV25tCEwnQgEIEl4UWwMLVG5cOEsRBW8IHF0WXAMCUFxtD0seMzRddT9-IFRHJzsJdyJPRF84K1glWgYLQFgvSRkDBR04K1slXjYCVV5cDUwfCm8OHEcVXwAEXVtBCE0RA28PHVkTXgIDVW5fCUoTCl84xdalPw5kBBlVYAx-Aw9LawASHtiP5E8veEkTBWgZKxpMHmJCHzsVACB-cB9wEiBVFAR2NSwhUCUVVyx8Ex9gXFIKAjtdfxZTRhg4HmsSXgQAZA'
    },
    { 
      sku: '100018', 
      name: '可达鸭手办', 
      desc: '精灵宝可梦可达鸭手办，傲娇鸭摆件，潮玩礼物', 
      keyword: '井然有序', 
      price: 22.80, 
      image: '',
      emoji: '📦',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATQJK1olXwQLU1ZeCkkUAF8IGlocVAMDUVZfAU0fC19MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWAmYBHloQVQQLUlZVFxJSXzI4ezh8WlpgDhg4aSl-Bit9QjhFBXB9AlJROEonAG4KHVMVWA8GV25tCEwnQgEIGV0QWg4DUW5cOEsRBW8IHF0WXwcBVl5tD0seMzRddT9-IFRHJzsJdyJPRF84K1glWgYLQFgvSRkDBR04K1slXjYCVV5cDEwTBmwPGEcVWQcDXVxBCE0RA28PHVgVWwMFUG5fCUoTCl84xdalLgRLVT5baBBNRBNyRzMQFNiP5E82cUMXA2wZKwJUA0VGAiU_e0h0eAQBchtAH1F4ABUfSSUVRid_XVlzD2JxNSAdCBFVUTU4HmsSXgQAZA'
    },
    { 
      sku: '100019', 
      name: '魔女之旅伊蕾娜手办', 
      desc: '魔女之旅伊蕾娜手办，灰之魔女跪姿摆件，动漫周边', 
      keyword: '能量满满', 
      price: 28.90, 
      image: '',
      emoji: '🔋',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATQJK1olXwEAVFheAE8WBl8IGlsUWgYLUVZZCk0QA19MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWA24PG1IQVQIAUlldFxJSXzI4UlN0AgNqLg49cUxpVSx4QSBvK15KJFJROEonAG4KHVMVWA8GV25tCEwnQgEIHVwRWQALUW5cOEsRBW8IHF0WWAUCXV1tD0seMzRddT9-IFRHJzsJdyJPRF84K1glWgYLQFgvSRkDBR04K1slXjYCVV5cDEwTBmwPGEcVWQcDXVxBCE0RA28PHVgVWwMFUG5fCUoTCl84xdalJgR7JwlfDj1FSAl3Rx1sXtiP5E8hf08QCm8ZK1lKO2IHMzwcfS9DeWpLRjIULXpjJj1YciUVUShpeFJMNgB3FiQDCR5SeCk4HmsSXgQAZA'
    },
    { 
      sku: '100020', 
      name: '海贼王索隆手办', 
      desc: '海贼王Q版索隆手办，路飞索隆艾斯山治摆件，动漫模型', 
      keyword: '创意生活', 
      price: 22.56, 
      image: '',
      emoji: '🎨',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATUJK1olXw8AV1tcCE8SAl8IGlgUXA8GV1hYDk0TC19MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWAG4JEl8WWwMEUlpVFxJSXzI4ZSZxFVIEVAk-dTVHWzFQZQxePABAJFJROEonAG4KHVMVWA8GV25tCEwnQgEIHlMdVQ4KXVZtCXsXBWkIG1wTXgEDVVZeOEwXCl9TTjVxNntQES04XDR-Wyg4K2sWbQECXUpbegpFF2l6K2sVbQUyVF9dCU8QB2oLHFgJXQIDVVdfFEsRBW8IHF0WXQAHU1ptCkoWB2Y4K4WY7W0EXAQhDQx-BypyWCZJAXjc2e5MdDwVAWcJCmtlOGNLFF4EARFqexRpaQNND14EAgMjajx5AQl8XTBtA2VxDloCcQhrRx9sK14lWgUAVm4'
    }
  ],
  
  // 分类5：creative (21-24号商品)
  creative: [
    { 
      sku: '100021', 
      name: '疯狂动物城摆件', 
      desc: '疯狂动物城尼克朱迪摆件，动漫手办公仔，桌面装饰', 
      keyword: '舒适生活', 
      price: 22.8, 
      image: '',
      emoji: '🛋️',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATUJK1olXw4DU1tfDkgQAF8IGlgUVQMAXVlYDEsVCl9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWAG4AHlkcWgMGVFxUFxJSXzI4GwAUDlRAMQ4-SylVQixIaV5wJxxmAlJROEonAG4KHVMVWA8GV25tCEwnQgEIHlIWXwAHVldtCXsXBWkIG1wTXgAKUVldOEwXCl9TTjVxNntQES04XDR-Wyg4K2sWbQECXUpbegpFF2l6K2sVbQUyVF9dCUwUBmwMGFIJXQYDUVleFEsRBW8IHF0WWwIAU1ltCkoWB2Y4K4WbyXh2LgQGfD9BeTJBej8cDgTc2spMejsXB24OCmtRHQJnHSQnbD92UTRLYydcFXRwPTcpTQp5AThebRBNLWB2IFw_SChsWgdNK14lWgUAVm4'
    },
    { 
      sku: '100022', 
      name: '警察公仔手办', 
      desc: '警察公仔手办，车载摆件，桌面装饰玩偶', 
      keyword: '纪念珍藏', 
      price: 28, 
      image: '',
      emoji: '🖼️',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATQJK1olXwMLU19bCk0UBl8IGlsUWQEDXVteD0sWAl9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWA24MHFocWAUFVF9cFxJSXzI4fS10AVBbJDY4UR9fUB0OTQZcKQUDAlJROEonAG4KHVMVWA8GV25tCEwnQgEIHV8SWQQEUW5cOEsRBW8IHF0WVQEDXVxtD0seMzRddT9-IFRHJzsJdyJPRF84K1glWgYLQFgvSRkDBR04K1slXjYCVV5cD0gSAGsLEkcVXQcHU11BCE0RA28PHVgTWQQFU25fCUoTCl84xdWBPQJ8Fy4taztHXmlWbj4QW9iMwE8hbE8XAmoZKz5lDW0HDgseVgMTYyhXfQNiNnF0EhpcWyUVAw8PGSljOWBcIgVbe0NpCgw4HmsSXgQAZA'
    },
    { 
      sku: '100023', 
      name: '绿巨人手办', 
      desc: '漫威绿巨人浩克手办，复仇者联盟摆件，关节可动', 
      keyword: '清新自然', 
      price: 29.90, 
      image: '',
      emoji: '🌱',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATQJK1olXgYAUVtaCUgTAl8IGloSXw8FU1xVC0MXCl9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWAmgKElwSXw4BXF5UFxJSXzI4aSB9FWMEJx84WANDdAldRwFHO3FSAlJROEonAG4KHVMVWA8GV25tCEwnQgEIGlkSWA4KXW5cOEsRBW8IHF0XXQYFVlltD0seMzRddT9-IFRHJzsJdyJPRF84K1glWgYLQFgvSRkDBR04K1slXjYCVV5cD0gSAGsLEkcVXQcHU11BCE0RA28PHVgTWQQFU25fCUoTCl84xdWBKXJ3LgwoVk0XfDBcHiJoFdiMwE8hf0ITB2sZK18TLVZKVFYrQRNQBQZeGC0XOlxGNw0hfCUVWDUAYCVwPH5LCy4qbRZ1Cmw4HmsSXgQAZA'
    },
    { 
      sku: '100024', 
      name: '战锤40K手办', 
      desc: 'JOYTOY战锤40K手办，暗源战锤系列，可动模型', 
      keyword: '甜蜜分享', 
      price: 20, 
      image: '',
      emoji: '🍫',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATIJK1olXQcBV1ZfDE4WB18IGlsQXgMAU15fCEIRA19MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWA2oLHlkSXQQCXVhdFxJSXzI4bTlpNVtDIFo9YCkUACsJSFttXV52JFJROEonAG4KHVMVWA8GV25tCEwnQgEIElIcXAQyVW5dDk0XA2gOGVkTXwEEZFldAXtMVgFscCZHGHVnACE0UAwnM18LK1wVVBIEJh8PHE1lM18IK1glXQcCVVpYDU8WB20UG18XXgALSF5bDksXBGkKGF0QWgUyVl9cDEInM7GGjzAdO15VUR8BCSNqRDd-chPL05ITJi5UD0IWEl9RWgVWGVB5Ni1eazBcARQAchlCB0IFPCIzCg5fdCkKfQlxLmd5BFhYWiBNM2o4HFgXXzY'
    }
  ],
  
  // 分类6：food (25-28号商品)
  food: [
    { 
      sku: '100025', 
      name: '钢铁侠手办 反浩克装甲', 
      desc: '反浩克装甲钢铁侠手办，发光机器人，金属质感', 
      keyword: '健康美味', 
      price: 28.57, 
      image: '',
      emoji: '🥜',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATQJK1olXw8AXFhdAUIUAV8IGlgUXgMAVV5VCUMSBF9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWAG4LHlkUXQ4DXFtaFxJSXzI4TyRDOXBUDh49VQ9NCjYPYjpyGWVcNFJROEonAG4KHVMVWA8GV25tCEwnQgENHVISXwMFXW5cOEsRBW8IHF0XWQcGUlltD0seMzRddT9-IFRHJzsJdyJPRF84K1glWgYLQFgvSRkDBR04K1slXjYCVV5cDE4SB24MGUcVWQQBUldBCE0RA28PHVkWWwMFV25fCUoTCl84xdWBNXNpFCheQTRvQGtYehpoL9iMwE8veEIQCm4ZK1gcJHJEXR4jXRd3CjNMbjprA1BFMBgIXyUVUDBrczptAFFXHDhafzthAwk4HmsSXgQAZA'
    },
    { 
      sku: '100026', 
      name: '钢铁蜘蛛侠手办', 
      desc: '中动玩具钢铁蜘蛛侠手办，复仇者联盟摆件，关节可动', 
      keyword: '暖心饮品', 
      price: 29.90, 
      image: '',
      emoji: '🧋',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATMJK1olXgYAUVtaCUgTAl8IGlocXwECV1pfCk8fAF9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWAmYKHFsWWQQAUFZeFxJSXzI4fCwUA3FXNF8-eBd0ZS1BbA0dK2ZJJFJROEonAG4KHVMVWA8GV25tCEwnQgEIGlkSWA4KXW5cOEsRBW8IHF0XVAYBXVxtD0seMzRddT9-IFRHJzsJdyJPRF84K1glWgYLQFgvSRkDBR04K1slXjYCVV5cDUwfCm8OHEcVXwAEXVtBCE0RA28PHVkTXgIDVW5fCUoTCl84xdWBKAVdNyxbTQpkdTxdQV5qAtiMwE8vY0sTBn44QBx-KlFQKBgKbhd0fBh3QwJvH1FREj0_ZkkTAGtIYz4TXFF8UyJZfT9oal8NK1wWXwQy'
    },
    { 
      sku: '100027', 
      name: '战锤暗源手办', 
      desc: 'JOYTOY暗源战锤手办，极限战士，可动模型', 
      keyword: '下午茶点', 
      price: 20, 
      image: '',
      emoji: '🍪',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATIJK1olXQcBV1ZfDE4WB18IGlsRWQAGXV9fAU0WBl9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWA2sMHV8cXAQLUl9YFxJSXzI4XCgcNmNpKzU4UVEXQxV1Tw5WJVYHJFJROEonAG4KHVMVWA8GV25tCEwnQgEIElIcXAQyVW5dDk0XA2gOHloQVQYKZFldAXtMVgFscCZHGHVnACE0UAwnM18LK1wVVBIEJh8PHE1lM18IK1glXQcCVVtaAEIXBWgUG1kTWw8HSF5bDksXBGkKHVgRXAcyVl9cDEInM7GFqyRnJnoHISYISh5VfghQYRvL0LYTKClUCkkTEl9zaQNqH2d1XAgbc0xrUWcMYwR-D3hJUVwzCjBtYSZ-GAtGC291KlsYfElQM2o4HFgXXzY'
    },
    { 
      sku: '100028', 
      name: '钢铁侠MK85手办', 
      desc: '中动玩具钢铁侠MK85手办，复仇者联盟摆件', 
      keyword: '心心相印', 
      price: 49, 
      image: '',
      emoji: '💫',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BASkJK1olXDYCVV9cDkkTBm8JGl0lGVlaCgFtUQ5SQi0DBUVNGFJeSwUIFxlJX3EIGloUWwQGUV5cCU0IWipURmtAInlbLhcPACkSQzB6fCxKBQJGPFYLBEcnAl8LGlkTVQYHXVpeOHsXBF9edVsUXAcHUl5cDEsnAl8IHV0VXQEEUVpcCEkeM2gIEmtOCGhmPyMPTThyVxBhQxwlbTYBZFldAV8RcS5aD11nbTYCZF1tCEoXAmYJHVsTWAEeVF5aDEoWH28OHVsVWgAHUV9cAUgnAW4JH1IlbdiP5DwqaS9sAi1zTl5CWg4BVxiDhfsGcR8IGVMXTDZHACQeWDBLBRdaRjhHXFJ5K1kIDS9NURJmGQJOX3tENxUOcDsfBS5VGFlhbQMyU11fCns'
    }
  ],
  
  // 分类7：fashion (29-32号商品)
  fashion: [
    { 
      sku: '100029', 
      name: '漫威钢铁侠手办 MK50', 
      desc: '漫威钢铁侠手办，MK50关节可动，生日礼物', 
      keyword: '酷炫出行', 
      price: 79, 
      image: '',
      emoji: '🕶️',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BASkJK1olXDYCVV9cD0wRBmoJGF8lGVlaCgFtUQ5SQi0DBUVNGFJeSwUIFxlJX3EIGloUWgEEUVtcC08IWipURmtmVH17DRgqSyhFQxlxBQtwLQV2EzY9BEcnAl8LGlkTVQYHXVpeOHsXBF9edVsUXAcGVl9eDksnAl8IHV0VXQEEUVlZCEITM2gIEmtOCGhmPyMPTThyVxBhQxwlbTYBZFldAV8RcS5aD11nbTYCZF1tCEoXAmYJHVsTWAEeVF5aDEoWH28OHVsVWgAHUV9cAUgnAW4JH1IlbdiP5CFZThEWdAdqEyZNWGNKUTqDhfsGfxgKGVMUTDZaEjoAch9VcxBqGyUVVX9CBwcpVBFySGZmGQ5CWGNGCAFddypFXWxPcxNDbQMyU11fCns'
    },
    { 
      sku: '100030', 
      name: 'BKS智能电子秤', 
      desc: 'BKS智能电子秤，体重秤家用，精准称重', 
      keyword: '潮流搭配', 
      price: 149, 
      image: '',
      emoji: '👜',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATAJK1olXwQBXFdaDUwWAV8IGloRVAABXVxVDkIXC19MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWAmsBHVgcXw4EXV5VFxJSXzI4AQNPFn5xDzc-eilkdWhWEywcHxxgAlJROEonAG4KHVMVWA8GV25tCEwnQgEOHl4dWDYDZF5bDksXBGkMGlwdVQ4yU15UOBBCbQtjZglQLmNWKzcFT3snM2w4HFscSQBwFQxJDjknM284GGsVXAYDXV9bCE0SBHMIG1wRXAceVFhbCEsQBWoNGlocXjYAVV9ZAXsn3eK4bFsRK2MGC1c-chYUdQ9SQ4WY7RdwJF5ZCU0GMzMPWjtGWwJaFSIpa052QRhzSwhKLVhnVDBfVQBlACYKTwBUKG94ACIYajsnBl8PH1gl'
    },
    { 
      sku: '100031', 
      name: '乐扣乐扣保温杯', 
      desc: '乐扣乐扣儿童保温杯，316L不锈钢，500ml大容量', 
      keyword: '温暖时尚', 
      price: 115.52, 
      image: '',
      emoji: '🧣',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BATIJK1olXwQBVV9bAUkUBV8IGloVXQYLVlxeDUknRzBQRQQlBENHFRxWFlVPRjtUBABAQlRcCEBdCUoXA28BGVkWWAQdDRsBVXtjRW16UAB1KWR2IhwrUxxNdAd9cytDUQoyVW5eCUkRC28NEl8WbTYCU24LZksWAm4JGl4SWAAyVW5dDk0XA2gOH1gRXw8LZFldAXtMVgFscCZHGHVnACE0UAwnM18LK1wVVBIEJh8PHE1lM18IK1glXQcCVVdcDksRBmgUG1sSWQcDSF5bDksXBGkNHloUVAUyVl9cDEInM7GFqzgXW2EEVgRZaAARQG92YiPL0LYTKDpZCEoSEl9vZFhDB0VFLSUdW04XUwZQTShjXgRJLCMzCjxhVRhAfjxXJl1XAQw6aCpMM2o4G1kVVTY'
    },
    { 
      sku: '100032', 
      name: '佐罗防身用品', 
      desc: '佐罗防身用品，女性防身安全装备，便携防身', 
      keyword: '温暖守护', 
      price: 109, 
      image: '',
      emoji: '🔥',
      promotionUrl: 'https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BAVEJK1olXwQAVFtZAEwSBl8IGloUWwAHU1tfC0knRzBQRQQlBENHFRxWFlVPRjtUBABAQlRcCEBdCUoWBWkNHF4XXgQdDRsBVUVTXDdWRCdBCF5SMQ4LBEh5AgEIKx98HAVWKAILbTkNBgp4elJmXA8CBhhRBHsWM2wJGV0dXQMLUF1tOEsQMy1mzte0i4qkjejG0eqD1MmuwuKUiY2kZF9tCE0RA28PHV8SXQYLVm5aCEInWDpmfzBoD0NxMQoiYRNQM184GGsSXQ8WUiwcWl8RcV84G2sWbQYDVF9UCU0XBWoPB1sVWgIDVUJdDk0XA2gOHl4UXA8BZFxcCU8eM1_Wlc92VXxlIVwBfSkUfTl-T1tMg4iWRSwtCEkVA344az5wFEYCDVcHdTNsZBMPXzxNW1pFLy5fZklxdyljYwV2LlxHPQUKYw4TZ18NK1wTXg8y'
    }
  ],
  
  sport: []
};

// 根据SKU获取推广链接
function getPromotionUrl(sku) {
  for (const category of Object.values(promotionLinks)) {
    const item = category.find(i => i.sku === sku);
    if (item) {
      return item.promotionUrl;
    }
  }
  return null;
}

// 根据SKU获取完整商品信息
function getGiftBySku(sku) {
  for (const [category, items] of Object.entries(promotionLinks)) {
    const item = items.find(i => i.sku === sku);
    if (item) {
      return { ...item, category };
    }
  }
  return null;
}

// 获取所有带推广链接的商品
function getAllPromotions() {
  const result = [];
  for (const [category, items] of Object.entries(promotionLinks)) {
    for (const item of items) {
      result.push({ ...item, category });
    }
  }
  return result;
}

module.exports = { promotionLinks, getPromotionUrl, getGiftBySku, getAllPromotions };