# SDS CLI application

Command line interface for data aggregation and synthesis provided by the core library.

# How to compile

When you compile the core rust library, the CLI application will also be built, so please follow the instructions in [here](../core/README.md#how-to-compile).

# Usage

> More information can be seen on the help of the CLI tool (`./sds-cli --help`, `./sds-cli aggregate --help` and `./sds-cli generate --help`)

## Aggregate

```bash
sds-cli --sensitive-path <sensitive_path> --sensitive-delimiter <delimiter> --resolution <reporting_resolution> --n-threads <n> aggregate --aggregates-path <aggregates_path> --reporting-length <reporting_length>
```

Generates the `aggregates_path` tsv file containing precomputed and protected counts of all sensitive attribute combinations up to `reporting_length` in length. Since these are highly sensitive if the counts are not protected, the file should be protected in the same way as the original microdata.

## Generate

```bash
sds-cli --sensitive-path <sensitive_path> --sensitive-delimiter <delimiter> --resolution <reporting_resolution> --n-threads <n> generate --synthetic-path <synthetic_path> --mode <seeded|unseeded>
```

Generates the `sensitive_path` csv file containing synthetic microdata representing the structure and statistics of data at `sensitive_path`, without leaking any attribute combinations that are rare in the sensitive data.

## Example

Let's take the following csv file named `example.csv` as example:

_example.csv_

```csv
A,B,C,F,G,D
a2,b2,c3,0,0,d2
a1,b1,c1,0,0,d1
a1,b1,c1,0,0,d1
a1,b2,c2,0,0,d2
a2,b2,c2,0,0,d2
a2,b1,c2,0,0,d2
a1,b1,c1,0,0,d1
a2,b3,c2,0,0,d2
a2,b2,c1,0,0,d1
a3,b2,c2,0,0,d2
a2,b2,c2,0,0,d3
```

Running `sds-cli --sensitive-path example.csv --sensitive-delimiter , --resolution 2 --n-threads 1 aggregate --aggregates-path aggregates.tsv --reporting-length 3`, would produce a similar output to:

_aggregates.tsv_

```tsv
selections	protected_count
selections	10
B:b2;D:d2	4
A:a1;B:b1;C:c1	2
A:a1	4
A:a2;B:b2;D:d2	2
C:c1;D:d1	4
D:d2;F:1	2
B:b1;D:d1	2
F:1	2
C:c2;D:d2	4
C:c2;D:d2;F:1	2
D:d1	4
A:a2;B:b2;C:c2	2
A:a2	6
B:b1	4
B:b2	6
B:b1;C:c1	2
A:a2;C:c2	4
C:c1	4
B:b2;D:d2;F:1	2
A:a1;D:d1	2
A:a1;C:c1;D:d1	2
D:d2	6
B:b1;C:c1;D:d1	2
B:b2;C:c2	4
A:a2;D:d2	4
A:a1;B:b1;D:d1	2
A:a1;B:b1	2
A:a2;C:c2;D:d2	2
B:b2;C:c2;F:1	2
B:b2;C:c2;D:d2	2
A:a2;B:b2	4
A:a1;C:c1	2
C:c2;F:1	2
C:c2	6
B:b2;F:1	2
```

On the other hand, running `sds-cli --sensitive-path example.csv --sensitive-delimiter , --resolution 2 --n-threads 1 generate --synthetic-path synthetic.tsv --mode seeded` would produce a similar output to:

```tsv
A	B	C	F	G	D
a1	b1	c1			d1
a1	b1	c1			d1
a1	b1	c1			d1
	b2	c2			d2
	b2	c2	1
a2		c2			d2
a2		c2			d2
a2		c2			d2
a2	b2				d2
a2	b2				d2
a2	b2	c2
		c1			d1
	b2		1
	b1
a1
```

## CLI application log level

While running the command line application will write information to the screen regarding the execution. Different levels of information can be configured to be displayed by setting an environment variable (`RUST_LOG = <trace | debug | info | warn | error | off>`) prior to execution:

```bash
export RUST_LOG=trace
export RUST_LOG=debug
export RUST_LOG=info
export RUST_LOG=warn
export RUST_LOG=error
export RUST_LOG=off
```
