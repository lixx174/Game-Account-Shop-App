const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const gamesJsonPath = path.join(__dirname, '../src/utils/games.json');
const iconsDir = path.join(__dirname, '../public/icons');
const outputPath = path.join(__dirname, '../src/api/mockData.ts');

// 确保目录存在
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

// 读取 games.json
const gamesJson = fs.readFileSync(gamesJsonPath, 'utf-8');
const data = JSON.parse(gamesJson);

// 提取所有游戏
const allGames = [];
let idx = 0;

for (const group of data) {
    for (const game of group.games) {
        idx++;
        const url = game.iconurl;
        const ext = url.endsWith('.webp') ? 'webp' : url.endsWith('.png') ? 'png' : 'jpg';
        const filename = `game_${String(idx).padStart(4, '0')}_${game.gameid}.${ext}`;

        allGames.push({
            id: game.gameid.toString(),
            name: game.gamename,
            icon: `icons/${filename}`,
            letter: game.firstChar,
            iconUrl: url,
            filename: filename
        });
    }
}

console.log(`Total games: ${allGames.length}`);

// 下载函数
function downloadFile(url, filepath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        const file = fs.createWriteStream(filepath);

        protocol.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                // 重定向
                downloadFile(response.headers.location, filepath)
                    .then(resolve)
                    .catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Status ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
}

// 批量下载（限制并发）
async function downloadAll() {
    const CONCURRENCY = 10;
    let completed = 0;
    let failed = 0;

    for (let i = 0; i < allGames.length; i += CONCURRENCY) {
        const batch = allGames.slice(i, i + CONCURRENCY);
        const promises = batch.map(async (game) => {
            const filepath = path.join(iconsDir, game.filename);
            try {
                await downloadFile(game.iconUrl, filepath);
                completed++;
                process.stdout.write(`\rDownloaded: ${completed}/${allGames.length} | Failed: ${failed}`);
            } catch (err) {
                failed++;
                process.stdout.write(`\rDownloaded: ${completed}/${allGames.length} | Failed: ${failed} | Error: ${game.name}`);
            }
        });
        await Promise.all(promises);
    }

    console.log(`\nDone! Downloaded: ${completed}, Failed: ${failed}`);
}

// 生成 mockData.ts
function generateMockData() {
    const gameEntries = allGames.map((g, i) => {
        return `  { id: '${g.id}', name: '${g.name}', icon: '${g.icon}', letter: '${g.letter}', pinyin: '' }${i < allGames.length - 1 ? ',' : ''}`;
    }).join('\n');

    const content = `/**
 * Mock 数据源
 * 基于 games.json 真实游戏数据生成
 * 图标已下载到 public/icons/
 */

export interface GameItem {
  id: string
  name: string
  icon: string
  letter: string
  pinyin?: string
}

export interface GoodsItem {
  id: string
  gameId: string
  title: string
  price: number
  images: string[]
  tags: string[]
  platform: string
  server: string
  level?: string
  updateTime: string
  wantCount: number
}

export interface GoodsDetail {
  id: string
  gameId: string
  gameName: string
  title: string
  price: number
  images: string[]
  tags: string[]
  params: Array<{ label: string; value: string }>
  updateTime: string
  wantCount: number
}

export const mockGames: GameItem[] = [
${gameEntries}
]

// 商品列表数据
export const mockGoodsList: Record<string, GoodsItem[]> = {
  '1002859': [
    {
      id: 'g001',
      gameId: '1002859',
      title: '准毕业6by有终身三星闪迪卡',
      price: 1595,
      images: ['https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Screenshot1'],
      tags: ['找回包赔', '官方验号', '安全保障'],
      platform: '安卓果盘帐号',
      server: '2210服',
      level: '234',
      updateTime: '4小时前',
      wantCount: 99
    },
    {
      id: 'g002',
      gameId: '1002859',
      title: '自己看吧。',
      price: 2140,
      images: ['https://via.placeholder.com/300x200/4a90d9/ffffff?text=Screenshot2'],
      tags: ['找回包赔', '官方验号', '安全保障'],
      platform: '当乐帐号',
      server: '1327服',
      level: '188',
      updateTime: '6小时前',
      wantCount: 45
    }
  ]
}

// 商品详情数据
export const mockGoodsDetail: Record<string, GoodsDetail> = {
  'g001': {
    id: 'g001',
    gameId: '1002859',
    gameName: '奥特曼系列OL',
    title: '准毕业6by有终身三星闪迪卡',
    price: 1595,
    images: [
      'https://via.placeholder.com/375x220/ff6b6b/ffffff?text=Screenshot+1',
      'https://via.placeholder.com/375x220/4a90d9/ffffff?text=Screenshot+2',
      'https://via.placeholder.com/375x220/50c878/ffffff?text=Screenshot+3',
    ],
    tags: ['找回包赔', '官方验号', '安全保障'],
    params: [
      { label: '游戏名称', value: '奥特曼系列OL' },
      { label: '商品类型', value: '成品号' },
      { label: '客户端', value: '果盘' },
      { label: '系统', value: '安卓版' },
      { label: '服务器', value: '2210服' },
      { label: '角色等级', value: '234' },
    ],
    updateTime: '4小时前更新',
    wantCount: 99
  }
}
`;

    fs.writeFileSync(outputPath, content, 'utf-8');
    console.log(`Generated ${outputPath} with ${allGames.length} games`);
}

// 执行
(async () => {
    await downloadAll();
    generateMockData();
})();
