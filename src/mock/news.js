function pick(arr, i) { return arr[i % arr.length]; }

export function generateMockNews(count = 30) {
  const reporters = ['Alice Zhang', 'Bob Li', 'Carol Wang', 'David Chen', 'Emma Liu', 'Frank Zhao', 'Grace Sun'];
  const baseDate = new Date('2025-10-10T09:00:00Z');
  const topics = [
    'City Water Outage Rumor', 'Celebrity Divorce Rumor', 'New Virus Spreading News', 'School Closure Notice Authenticity', 'Food Shortage Rumor',
    'Bridge Collapse Incident', 'Earthquake Early Warning Circulation', 'Gas Price Surge News', 'Train Accident Scene', 'E-commerce Platform Shutdown Rumor'
  ];
  const list = [];
  for (let id = 1; id <= count; id++) {
    const topic = `${pick(topics, id)} (#${id})`;
    const short = 'Summary: This news has spread widely on social platforms and needs community voting to judge authenticity.';
    const full = 'Details: Please judge based on official notices, authoritative media reports, on-site photos or videos, and explain your reasoning in comments.';
    const reporter = pick(reporters, id);
    const reportedAt = new Date(baseDate.getTime() + id * 3600_000).toISOString();
    const imageUrl = `/images/southeast.jpg`; // 使用 public/images 下的静态图片
    const votes = generateVotes(id);
    list.push({ id, topic, short, full, reporter, reportedAt, imageUrl, votes });
  }
  return list;
}

function generateVotes(seed) {
  const votesCount = 8 + ((seed * 7) % 22); // 8~29
  const biasMod = seed % 3; // 0偏假,1偏不假,2接近持平
  const fakeRatio = biasMod === 0 ? 0.65 : biasMod === 1 ? 0.35 : 0.5;
  const voters = ['Liam', 'Noah', 'Emma','Olivia','Ava','Mia','Sophia','Isabella','Ethan','Logan','Lucas','James','Henry','Amelia'];
  const comments = [
    'Source is dubious; no authoritative reports.', 'No related situation locally.', 'Officials have clarified the matter.', 'I think it is true.', 'Image may be edited.',
    'Photo taken on site.', 'More evidence is needed.', 'Media has debunked it.', 'This looks credible.', 'Share with caution.'
  ];
  const start = Date.now() - 5 * 86400_000; // 近 5 天
  const out = [];
  for (let i = 0; i < votesCount; i++) {
    const isFake = (i / votesCount) < fakeRatio;
    const voter = pick(voters, seed + i);
    const votedAt = new Date(start + i * 45000).toISOString();
    const comment = `${pick(comments, seed + i)} (#${seed}-${i})`;
    const imageUrl = i % 6 === 0 ? `/images/southeast.jpg` : ''; // 评论图片（可选）
    out.push({ id: `${seed}-${i}`, voter, isFake, comment, imageUrl, votedAt });
  }
  return out;
}

export function computeStats(n) {
  const fake = n.votes.filter(v => v.isFake).length;
  const nonFake = n.votes.length - fake;
  const status = fake > nonFake ? 'fake' : (nonFake > fake ? 'non-fake' : 'pending');
  const fakePct = n.votes.length ? Math.round(fake / n.votes.length * 100) : 0;
  const nonFakePct = n.votes.length ? Math.round(nonFake / n.votes.length * 100) : 0;
  return { ...n, fakeCount: fake, nonFakeCount: nonFake, status, fakePct, nonFakePct };
}