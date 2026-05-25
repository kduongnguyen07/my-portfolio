import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout title="Portfolio Cá Nhân" description="Dự án Công nghệ số">
      <main className={styles.mainWrapper}>
        <div className={styles.bentoGrid}>
          
          {/* 1. Profile Card */}
          <div className={clsx(styles.bentoCard, styles.profileCard)}>
            <div className={styles.badge}>UET - K70</div>
            <h1 className={styles.profileName}>Dương Nguyên Khánh</h1>
            <p className={styles.profileTitle}>AI Engineer Aspirant</p>
            <Link className={styles.primaryBtn} to="/docs/giới-thiệu">
              Xem Portfolio 🚀
            </Link>
          </div>

          {/* 2. Project Card - Trỏ về danh sách nhiệm vụ */}
          <Link to="/docs/bai-1-quan-ly-tep" className={clsx(styles.bentoCard, styles.projectCard)}>
            <span className={styles.cardTag}>Học liệu & Bài tập</span>
            <h3>Nhiệm vụ 1 - 6</h3>
            <p>Hệ thống hóa toàn bộ kết quả thực hành môn Công nghệ số.</p>
            <div className={styles.arrowIcon}>→</div>
          </Link>

          {/* 3. GitHub Slot (Mới) */}
          <a href="https://github.com/kduongnguyen07" target="_blank" className={clsx(styles.bentoCard, styles.githubCard)}>
            <div className={styles.cardHeader}>
              <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className={styles.miniIcon} />
              <span>GitHub</span>
            </div>
            <h4>@kduongnguyen07</h4>
            <p>Source code & Projects</p>
          </a>

          {/* 4. Codeforces Slot (Mới) */}
          <a href="https://codeforces.com/profile/_thirsty" target="_blank" className={clsx(styles.bentoCard, styles.cfCard)}>
            <div className={styles.cardHeader}>
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3628695-3029920.png" alt="CF" className={styles.miniIcon} />
              <span>Codeforces</span>
            </div>
            <h4>Competitive Programming</h4>
            <p>Rating: Expert (1853)</p>
          </a>

          {/* 5. Stat Card */}
          <div className={clsx(styles.bentoCard, styles.statCard)}>
            <h2 className={styles.hugeNumber}>6/6</h2>
            <p>Nhiệm vụ hoàn thành</p>
          </div>

          {/* 6. Skill Card */}
          <div className={clsx(styles.bentoCard, styles.skillCard)}>
            <span className={styles.cardTag}>Kỹ năng số</span>
            <div className={styles.skillList}>
              <span>C++</span> <span>Python</span> <span>LLMs</span> <span>Git</span> <span>Vercel</span>
            </div>
          </div>

        </div>
      </main>
    </Layout>
  );
}