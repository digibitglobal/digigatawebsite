module.exports = {
  ci: {
    collect: {
      staticDistDir: 'out',
      numberOfRuns: 1,
      url: ['index.html']
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }]
      }
    },
    upload: { target: 'temporary-public-storage' }
  }
}

