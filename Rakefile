require 'rake'
require 'rake/packagetask'

INHERITANCE_ROOT     = File.expand_path(File.dirname(__FILE__))
INHERITANCE_SRC_DIR  = File.join(INHERITANCE_ROOT, 'src')
INHERITANCE_DIST_DIR = File.join(INHERITANCE_ROOT, 'dist')
INHERITANCE_PKG_DIR  = File.join(INHERITANCE_ROOT, 'pkg')
INHERITANCE_VERSION  = '2.3'

task :default => [:dist, :package, :clean_package_source]

task :dist do
  $:.unshift File.join(INHERITANCE_ROOT, 'vendor/lib')
  require 'protodoc'
  
  Dir.chdir(INHERITANCE_SRC_DIR) do
    File.open(File.join(INHERITANCE_DIST_DIR, 'inheritance.js'), 'w+') do |dist|
      dist << Protodoc::Preprocessor.new('inheritance.js')
    end
  end
end

Rake::PackageTask.new('inheritance', INHERITANCE_VERSION) do |package|
  package.need_tar_gz = true
  package.package_dir = INHERITANCE_PKG_DIR
  package.package_files.include(
    '[A-Z]*',
    'dist/inheritance.js',
    'doc/**',
    #'examples/**',   # do they really need the examples in the distro?
    'src/**',
    'test/**',
    'vendor/**'
  )
end

desc "Creates distribution and runs unit tests"
task :test => [:dist, :test_units]

require 'test/lib/jstest'
desc "Runs all the JavaScript unit tests and collects the results"
JavaScriptTestTask.new(:test_units) do |t|
  t.mount("/dist")
  t.mount("/vendor")
  t.mount("/test")

  t.run("/test/unit/inherits.html")
  t.run("/test/unit/basic.html")
  t.run("/test/unit/mixins.html")


  t.browser(:firefox)
  #t.browser(:safari)
  #t.browser(:webkit)
  #t.browser(:ie)
  #t.browser(:konqueror)
end

task :clean_package_source do
  rm_rf File.join(INHERITANCE_PKG_DIR, "inheritance-#{INHERITANCE_VERSION}")
end
