/**
 * Temporarily disable ESLint during build to prevent rule-loader crashes
 * caused by version mismatches in hosted build environments.
 * If you'd prefer strict linting, remove this and fix rule/plugin versions.
 */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}
